import { useState } from 'react';
import { Star, X } from 'lucide-react';
import {
  INITIAL_REVIEWS,
  RATING_BREAKDOWN,
  RESTAURANT_INFO,
  REVIEW_TOPICS,
  GuestReview,
} from '../data/restaurantData';

export function ReviewsSection() {
  const [reviews, setReviews] = useState<GuestReview[]>(INITIAL_REVIEWS);
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [formError, setFormError] = useState('');

  const filteredReviews = reviews
    .filter((rev) => activeTopic === 'all' || rev.topics.includes(activeTopic))
    .sort((a, b) => (sortBy === 'highest' ? b.rating - a.rating : 0));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newName.trim() || !newTitle.trim() || !newExcerpt.trim()) {
      setFormError('Please provide your name, headline, and dining impression.');
      return;
    }

    const created: GuestReview = {
      id: `rev-${Date.now()}`,
      author: newName.trim(),
      credentials: 'Verified Guest',
      rating: newRating,
      date: 'Just now',
      topics: activeTopic === 'all' ? ['steak-frites'] : [activeTopic],
      title: newTitle.trim(),
      excerpt: newExcerpt.trim(),
    };

    setReviews((prev) => [created, ...prev]);
    setNewName('');
    setNewTitle('');
    setNewExcerpt('');
    setNewRating(5);
    setWriteModalOpen(false);
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 border-b border-[#171412]/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Claim-to-Proof Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-[#171412]/12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#7A5B26] mb-2">
                Guest Impressions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#171412]">
                Celebrated Across Midtown Manhattan
              </h2>
            </div>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-display text-5xl font-semibold text-[#171412] tabular-nums">
                {RESTAURANT_INFO.rating.toFixed(1)}
              </span>
              <div>
                <div className="flex items-center gap-1 text-[#8C6A2E]" aria-label="4.6 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? 'fill-[#8C6A2E]' : 'fill-[#8C6A2E]/50'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#61584F] mt-1 tabular-nums">
                  Based on {RESTAURANT_INFO.reviewCount.toLocaleString()} verified guest reviews
                </p>
              </div>
            </div>

            <p className="text-sm text-[#4A433D] leading-relaxed">
              Guests consistently praise our authentic steak frites, sizzling escargots, and
              bubbling French onion soup alongside attentive service inside the heated
              Parisian atrium.
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#171412]/10 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-medium text-[#171412]">
                Guest Rating Distribution
              </h3>
              <button
                type="button"
                onClick={() => setWriteModalOpen(true)}
                className="px-4 py-2 text-xs font-medium border border-[#171412] text-[#171412] hover:bg-[#171412] hover:text-[#F5F4F0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            <div className="space-y-2.5">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-[#4A433D] tabular-nums shrink-0">
                    {row.stars} stars
                  </span>
                  <div className="flex-1 h-2 bg-[#E9E6DE] overflow-hidden">
                    <div
                      className="h-full bg-[#8C6A2E]"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[#61584F] tabular-nums shrink-0">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Topic Filters & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#171412]/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {REVIEW_TOPICS.map((topic) => {
              const isActive = topic.id === activeTopic;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setActiveTopic(topic.id)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                      : 'bg-transparent text-[#4A433D] border-[#171412]/15 hover:border-[#171412]/40'
                  }`}
                >
                  <span className="tabular-nums">
                    {topic.label} ({topic.count.toLocaleString()})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="review-sort" className="text-xs text-[#61584F]">
              Sort by
            </label>
            <select
              id="review-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest')}
              className="text-xs font-medium bg-[#FAF9F6] border border-[#171412]/20 px-3 py-2 text-[#171412] focus:outline-none focus:border-[#5C1A22] cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="bg-[#FAF9F6] border border-[#171412]/10 p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[#61584F]">
                  <div className="flex items-center gap-0.5 text-[#8C6A2E]" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#8C6A2E]" />
                    ))}
                  </div>
                  <span>{review.date}</span>
                </div>

                <h3 className="font-display text-xl font-semibold text-[#171412] leading-snug">
                  {review.title}
                </h3>

                <p className="text-sm text-[#4A433D] leading-relaxed">
                  {review.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#171412]/8">
                <p className="text-sm font-medium text-[#171412]">{review.author}</p>
                <p className="text-xs text-[#61584F] mt-0.5">{review.credentials}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {writeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Write a guest review"
        >
          <div className="w-full max-w-lg bg-[#F5F4F0] text-[#171412] border border-[#171412]/15 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold">
                Share Your Experience
              </h3>
              <button
                type="button"
                onClick={() => setWriteModalOpen(false)}
                aria-label="Close review modal"
                className="w-9 h-9 flex items-center justify-center hover:bg-[#171412]/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="rev-name"
                  className="block text-xs font-medium text-[#4A433D] mb-1"
                >
                  Your Name
                </label>
                <input
                  id="rev-name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Julien Moreau"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#4A433D] mb-1.5">
                  Overall Rating
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setNewRating(value)}
                      className={`px-3 py-1.5 text-xs font-medium border tabular-nums cursor-pointer ${
                        newRating === value
                          ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                          : 'bg-[#FAF9F6] text-[#4A433D] border-[#171412]/20'
                      }`}
                    >
                      {value} Stars
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="rev-title"
                  className="block text-xs font-medium text-[#4A433D] mb-1"
                >
                  Headline
                </label>
                <input
                  id="rev-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Memorable evening under the stained-glass atrium"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-excerpt"
                  className="block text-xs font-medium text-[#4A433D] mb-1"
                >
                  Dining Notes
                </label>
                <textarea
                  id="rev-excerpt"
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Share your favorite dishes, cocktails, or service moments..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                />
              </div>

              {formError && (
                <p className="text-xs font-medium text-[#8F1D2C]">{formError}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium border border-[#171412]/20 text-[#4A433D] hover:text-[#171412] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-medium bg-[#5C1A22] text-[#F5F4F0] hover:bg-[#471319] cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
