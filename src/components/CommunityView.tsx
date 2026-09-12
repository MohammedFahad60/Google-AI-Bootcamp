import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Flame,
  Share2,
  MapPin,
  Users,
  Trophy,
  Plus,
  Sparkles,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMMUNITY_POSTS, RUNNING_CLUBS, TRENDING_CHALLENGES } from '../data/mockData';
import { CommunityPost } from '../types';

export const CommunityView: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostDistance, setNewPostDistance] = useState('12.5');

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isLiked = p.isLikedByMe;
          return {
            ...p,
            isLikedByMe: !isLiked,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleCheer = (id: string) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF6B2C', '#FFC857', '#1479FF'],
    });

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isCheeredByMe: true,
            cheers: p.cheers + 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Arjun Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      location: 'Cubbon Park, Bengaluru',
      runTitle: 'Morning Training Loop',
      distanceKm: parseFloat(newPostDistance) || 10,
      duration: '58m 20s',
      pace: '5:12 / KM',
      caption: newPostCaption,
      likes: 1,
      commentsCount: 0,
      cheers: 1,
      timestamp: 'Just now',
      isLikedByMe: true,
      club: 'Koramangala Running Club',
    };

    setPosts([newPost, ...posts]);
    setNewPostCaption('');
  };

  return (
    <div id="community-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Bengaluru Running Tribe
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            THE RUNNING COMMUNITY
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Connect with fellow marathoners, share morning long runs, join local running clubs, and celebrate every milestone.
          </p>
        </div>

        {/* Community Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Share a Run Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1479FF] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    AS
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPostCaption}
                      onChange={(e) => setNewPostCaption(e.target.value)}
                      placeholder="Share your run, training advice, or race countdown thoughts with Bengaluru runners..."
                      rows={2}
                      className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#1479FF] focus:ring-2 focus:ring-[#1479FF]/20 outline-none resize-none transition-all"
                    />
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span>Distance (KM):</span>
                        <input
                          type="number"
                          step="0.1"
                          value={newPostDistance}
                          onChange={(e) => setNewPostDistance(e.target.value)}
                          className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!newPostCaption.trim()}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF6B2C] hover:bg-[#f05a18] disabled:opacity-50 transition-all flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Update</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Posts Stream */}
            {posts.map((post) => (
              <div
                key={post.id}
                id={`community-post-${post.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Author Info */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-heading font-black text-base text-[#071A33]">
                        {post.authorName}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {post.location}
                        </span>
                        {post.club && (
                          <>
                            <span>•</span>
                            <span className="text-[#1479FF] font-medium">{post.club}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-600 font-medium">
                    {post.timestamp}
                  </span>
                </div>

                {/* Run Metrics Bar */}
                <div className="px-5 py-3 bg-[#F5F7FA] border-y border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold uppercase">Distance</span>
                    <div className="font-heading font-black text-lg text-[#071A33]">
                      {post.distanceKm} KM
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold uppercase">Pace</span>
                    <div className="font-heading font-black text-lg text-[#1479FF]">
                      {post.pace}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold uppercase">Duration</span>
                    <div className="font-heading font-black text-lg text-[#071A33]">
                      {post.duration}
                    </div>
                  </div>
                </div>

                {/* Post Caption */}
                <div className="p-5">
                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {post.caption}
                  </p>

                  {/* Optional Image */}
                  {post.photoUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden max-h-96">
                      <img
                        src={post.photoUrl}
                        alt="Run"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Interaction Footer */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.isLikedByMe ? 'text-rose-600' : 'hover:text-rose-600'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          post.isLikedByMe ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                      <span>{post.likes} Likes</span>
                    </button>

                    <button
                      onClick={() => handleCheer(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.isCheeredByMe ? 'text-[#FF6B2C]' : 'hover:text-[#FF6B2C]'
                      }`}
                    >
                      <Flame
                        className={`w-4 h-4 ${
                          post.isCheeredByMe ? 'fill-[#FF6B2C] text-[#FF6B2C]' : ''
                        }`}
                      />
                      <span>{post.cheers} Cheers</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </span>
                  </div>

                  <button className="text-slate-600 hover:text-slate-700">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Challenges & Running Clubs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Trending Challenges */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-black text-lg text-[#071A33] flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#FFC857]" />
                  TRENDING CHALLENGES
                </h3>
              </div>

              <div className="space-y-4">
                {TRENDING_CHALLENGES.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-slate-900">
                        {ch.name}
                      </span>
                      <span className="text-[10px] font-bold text-[#1479FF] bg-blue-50 px-2 py-0.5 rounded">
                        {ch.runnersCount}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{ch.target}</div>
                    <div className="text-[11px] text-[#12B76A] font-semibold mt-1 flex items-center gap-1">
                      <span>Reward: {ch.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Running Clubs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-black text-lg text-[#071A33] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1479FF]" />
                  RUNNING CLUBS
                </h3>
              </div>

              <div className="space-y-3.5">
                {RUNNING_CLUBS.map((club, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-sm text-[#071A33]">
                        {club.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {club.members} • {club.base}
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-bold text-[#1479FF] hover:bg-blue-50 rounded-lg border border-[#1479FF]/30 transition-colors">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
