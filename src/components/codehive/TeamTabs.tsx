'use client';

import { useState } from 'react';
import { GoldText } from './ui';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  image?: string;
  linkedin?: string;
}

interface TeamCategory {
  id: string;
  label: string;
  members: TeamMember[];
}

const TEAM_DATA: TeamCategory[] = [
  {
    id: 'leadership',
    label: 'Leadership',
    members: [
      {
        id: 'founder-1',
        name: 'Shivam Kumar',
        role: 'Founder & CEO',
        email: 'shivam@codehive.org',
        phone: '+91 9876543210',
      },
      {
        id: 'cofounder-1',
        name: 'Rahul Sharma',
        role: 'Co-Founder & CTO',
        email: 'rahul@codehive.org',
        phone: '+91 9876543211',
      },
    ],
  },
  {
    id: 'tech',
    label: 'Tech Team',
    members: [
      {
        id: 'tech-1',
        name: 'Priya Singh',
        role: 'Tech Lead',
        email: 'priya@codehive.org',
        phone: '+91 9876543212',
      },
      {
        id: 'tech-2',
        name: 'Arjun Patel',
        role: 'Backend Developer',
        email: 'arjun@codehive.org',
        phone: '+91 9876543213',
      },
      {
        id: 'tech-3',
        name: 'Sneha Reddy',
        role: 'Frontend Developer',
        email: 'sneha@codehive.org',
        phone: '+91 9876543214',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design Team',
    members: [
      {
        id: 'design-1',
        name: 'Aditya Verma',
        role: 'UI/UX Lead',
        email: 'aditya@codehive.org',
        phone: '+91 9876543215',
      },
      {
        id: 'design-2',
        name: 'Kavya Nair',
        role: 'Graphic Designer',
        email: 'kavya@codehive.org',
        phone: '+91 9876543216',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    members: [
      {
        id: 'ops-1',
        name: 'Vikram Malhotra',
        role: 'Operations Manager',
        email: 'vikram@codehive.org',
        phone: '+91 9876543217',
      },
      {
        id: 'ops-2',
        name: 'Ananya Gupta',
        role: 'Events Coordinator',
        email: 'ananya@codehive.org',
        phone: '+91 9876543218',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    members: [
      {
        id: 'marketing-1',
        name: 'Rohan Kapoor',
        role: 'Marketing Head',
        email: 'rohan@codehive.org',
        phone: '+91 9876543219',
      },
      {
        id: 'marketing-2',
        name: 'Ishita Joshi',
        role: 'Content Manager',
        email: 'ishita@codehive.org',
        phone: '+91 9876543220',
      },
    ],
  },
];

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <div 
      className="relative group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      {/* Card with angled corners */}
      <div 
        className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.4)]"
        style={{
          clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)',
          border: '2px solid rgba(201, 162, 39, 0.3)',
        }}
      >
        {/* Gradient border effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(201, 162, 39, 0.3) 100%)',
            clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Image area - Large background for person photo */}
        <div className="relative h-80 bg-gradient-to-b from-[#1A1A1A] via-[#0A0A0A] to-[#0A0A0A] flex items-end justify-center overflow-hidden">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-[#0A0A0A] pointer-events-none" />
          
          {/* Placeholder for person image - will be replaced with actual image */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-4">
            {/* Placeholder avatar - this will be replaced with actual image */}
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#C9A227]/30 to-[#E5C84A]/20 flex items-center justify-center border-2 border-[#C9A227]/40 transition-all duration-500 group-hover:scale-105 group-hover:border-[#C9A227] group-hover:shadow-[0_0_30px_rgba(201,162,39,0.6)]">
              <span className="text-6xl font-bold text-[#C9A227] transition-all duration-500 group-hover:text-[#E5C84A]">
                {member.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Animated scan line */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A227]/30 to-transparent h-20 animate-scan" />
          </div>
        </div>

        {/* Content section */}
        <div className="relative p-6 bg-gradient-to-b from-[#0A0A0A] to-[#000000]">
          {/* Name */}
          <h3 className="font-sora text-xl font-bold text-white mb-1 text-center tracking-wider transition-colors duration-300 group-hover:text-[#E5C84A]">
            {member.name.toUpperCase()}
          </h3>
          
          {/* Role */}
          <p className="text-[#C9A227] text-sm font-semibold mb-4 text-center tracking-widest uppercase transition-all duration-300 group-hover:text-[#E5C84A]">
            {member.role}
          </p>

          {/* Contact info box with angled corners */}
          <div 
            className="relative bg-[#0A0A0A]/50 border border-[#C9A227]/30 p-4 transition-all duration-300 group-hover:border-[#C9A227]/60"
            style={{
              clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            }}
          >
            {member.email && (
              <div className="text-center text-sm text-gray-400 mb-2 font-mono transition-colors duration-300 group-hover:text-[#C9A227]">
                {member.email}
              </div>
            )}
            {member.phone && (
              <div className="text-center text-sm text-gray-400 font-mono transition-colors duration-300 group-hover:text-[#C9A227]">
                {member.phone}
              </div>
            )}
          </div>
        </div>

        {/* Corner accent lines */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#C9A227]/40 transition-all duration-500 group-hover:border-[#C9A227] group-hover:w-12 group-hover:h-12 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#C9A227]/40 transition-all duration-500 group-hover:border-[#C9A227] group-hover:w-12 group-hover:h-12 pointer-events-none" />

        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(201, 162, 39, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}

export function TeamTabs() {
  const [activeTab, setActiveTab] = useState('leadership');

  const activeCategory = TEAM_DATA.find(cat => cat.id === activeTab);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0A0A0A] relative">
      {/* Background grid - pointer-events-none */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0 animate-grid-move" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 162, 39, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 162, 39, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* Top glow - pointer-events-none */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#C9A227]/10 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 text-[#C9A227] text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            Our Team
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Meet The <GoldText>Team</GoldText>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            The passionate individuals building India's most execution-driven tech community
          </p>
        </div>

        {/* Tabs Navigation - Simplified */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-2">
          {TEAM_DATA.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                console.log('Tab clicked:', category.id);
                setActiveTab(category.id);
              }}
              type="button"
              className={`
                px-4 sm:px-6 py-2.5 sm:py-3 
                font-sora font-semibold text-sm sm:text-base 
                rounded-lg
                transition-all duration-300 
                hover:scale-105 active:scale-95
                cursor-pointer
                ${activeTab === category.id
                  ? 'bg-gradient-to-r from-[#C9A227] to-[#E5C84A] text-[#0A0A0A] shadow-[0_0_25px_rgba(201,162,39,0.5)]'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-[#C9A227] border-2 border-[#C9A227]/20 hover:border-[#C9A227]/50'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeCategory?.members.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
