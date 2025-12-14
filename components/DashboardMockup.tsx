import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Settings, 
  Shield, 
  LogOut, 
  Bell, 
  Search,
  Plus,
  MoreVertical,
  FileText
} from 'lucide-react';

type Role = 'Admin' | 'Instructor' | 'Student';

export const DashboardMockup: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>('Admin');

  // Mock Data
  const stats = {
    Admin: [
      { label: 'Total Users', value: '2,450', change: '+12%', color: 'bg-blue-500' },
      { label: 'Active Courses', value: '142', change: '+5%', color: 'bg-indigo-500' },
      { label: 'System Load', value: '98%', change: 'High', color: 'bg-rose-500' },
    ],
    Instructor: [
      { label: 'My Students', value: '185', change: '+2', color: 'bg-emerald-500' },
      { label: 'Pending Grades', value: '24', change: '-5', color: 'bg-amber-500' },
      { label: 'Avg Course Rating', value: '4.8', change: 'Top 5%', color: 'bg-blue-500' },
    ],
    Student: [
      { label: 'Enrolled Courses', value: '6', change: 'Active', color: 'bg-violet-500' },
      { label: 'Assignments Due', value: '3', change: 'This Week', color: 'bg-orange-500' },
      { label: 'GPA', value: '3.8', change: 'Good', color: 'bg-teal-500' },
    ]
  };

  const menuItems = {
    Admin: [
      { icon: <Users size={18} />, label: 'User Management' },
      { icon: <Shield size={18} />, label: 'Roles & Permissions' },
      { icon: <BookOpen size={18} />, label: 'All Courses' },
      { icon: <Settings size={18} />, label: 'System Settings' },
    ],
    Instructor: [
      { icon: <BookOpen size={18} />, label: 'My Courses' },
      { icon: <FileText size={18} />, label: 'Assignments' },
      { icon: <Users size={18} />, label: 'Student List' },
      { icon: <GraduationCap size={18} />, label: 'Gradebook' },
    ],
    Student: [
      { icon: <BookOpen size={18} />, label: 'My Learning' },
      { icon: <GraduationCap size={18} />, label: 'My Grades' },
      { icon: <Bell size={18} />, label: 'Notifications' },
    ]
  };

  const courses = [
    { id: 1, title: 'Advanced Java Programming', code: 'CS-301', students: 45, status: 'Active' },
    { id: 2, title: 'Database Design Principles', code: 'DB-201', students: 62, status: 'Active' },
    { id: 3, title: 'Web Architecture', code: 'CS-450', students: 38, status: 'Draft' },
  ];

  return (
    <div className="flex h-full bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      {/* Visual Role Switcher (For Demo) */}
      <div className="absolute top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-xl border border-slate-200 flex items-center gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview As:</span>
        <div className="flex bg-slate-100 p-1 rounded-md">
          {(['Admin', 'Instructor', 'Student'] as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentRole === role 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
            C
          </div>
          <span className="font-bold text-lg text-slate-800">CMS Portal</span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <UserAvatar role={currentRole} />
            </div>
            <div>
              <div className="text-sm font-semibold">{currentRole} User</div>
              <div className="text-xs text-slate-400">{currentRole.toUpperCase()}</div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems[currentRole].map((item, idx) => (
              <button key={idx} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors">
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <button className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-rose-600 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses, users..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-lg text-sm transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
              <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>
            {currentRole !== 'Student' && (
              <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Plus size={16} />
                Create New
              </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats[currentRole].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                  </div>
                  <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Contextual Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-800">
                {currentRole === 'Admin' ? 'System Courses' : currentRole === 'Instructor' ? 'My Classes' : 'Current Enrollments'}
              </h3>
              <button className="text-brand-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Course Code</th>
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-6 py-3 font-medium text-right">
                    {currentRole === 'Student' ? 'Instructor' : 'Students'}
                  </th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-600">{course.code}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                    <td className="px-6 py-4 text-right text-slate-600">
                      {currentRole === 'Student' ? 'Dr. Smith' : course.students}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-brand-600">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserAvatar: React.FC<{ role: Role }> = ({ role }) => {
  if (role === 'Admin') return <Shield size={20} />;
  if (role === 'Instructor') return <GraduationCap size={20} />;
  return <Users size={20} />;
};