import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedArtifacts, JavaFile } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to parse JSON from markdown code blocks if necessary
const cleanJson = (text: string): string => {
  const start = text.indexOf('```json');
  const end = text.lastIndexOf('```');
  if (start !== -1 && end !== -1) {
    return text.substring(start + 7, end).trim();
  }
  return text;
};

export const generateSystemArchitecture = async (requirements: string): Promise<GeneratedArtifacts> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a Senior Software Architect specializing in Java Spring Boot and MySQL.
    The user wants to build a Course Management System (CMS).
    
    User Requirements: "${requirements}"
    
    MANDATORY ARCHITECTURE REQUIREMENTS:
    1. Role-Based Access Control (RBAC):
       - Design a robust permission system with at least three roles: 'ADMIN', 'INSTRUCTOR', 'STUDENT'.
       - MySQL: Must include 'users', 'roles', and 'user_roles' (many-to-many) tables.
       - Java: Include proper Entity relationships for Users and Roles.
    
    2. Core CMS Features:
       - Standard entities: Courses, Enrollments, Grades/Submissions.
    
    Generate the following 3 things in a single JSON response:
    1. "schema": A complete MySQL CREATE TABLE script including foreign keys and initial seed data for roles.
    2. "javaFiles": An array of at least 5 essential Java files. MUST include:
       - User.java (Entity)
       - Role.java (Entity)
       - SecurityConfig.java (Spring Security Configuration)
       - CourseController.java (With @PreAuthorize annotations for roles)
       - CourseRepository.java
    3. "diagramData": A simple node/link structure for visualization.

    Constraint for Java: Use Spring Boot 3.x annotations (@Entity, @RestController, @PreAuthorize, @ManyToMany).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            schema: { type: Type.STRING, description: "The MySQL SQL script" },
            javaFiles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  content: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["entity", "controller", "repository", "service", "config"] }
                }
              }
            },
            diagramData: {
              type: Type.OBJECT,
              properties: {
                nodes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING }
                    }
                  }
                },
                links: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: { type: Type.STRING },
                      target: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedArtifacts;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const chatWithArchitect = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  try {
    const chat = ai.chats.create({
      model,
      history,
      config: {
        systemInstruction: "You are a helpful Java & MySQL Architect assistant specific to Course Management Systems. When asked about security, explain how Spring Security and RBAC work with the generated schema. Keep answers concise."
      }
    });
    
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (e) {
    console.error(e);
    return "Error communicating with the architect.";
  }
};