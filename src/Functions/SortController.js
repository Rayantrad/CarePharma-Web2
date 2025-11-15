import React, { useEffect, useMemo, useState } from "react";

function SortController({ data, onChange }) {
  const [sortOption, setSortOption] = useState("default");

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const enriched = data.map((item) => {
      const key = `pharmaDiscount-${item.id}`;
      const stored = JSON.parse(localStorage.getItem(key));
      let discount = 0;
      let discountedPrice = item.priceInDollar;

      if (stored) {
        discount = stored.discount;
        discountedPrice = parseFloat(stored.discountedPrice);
      } else {
        discount = Math.floor(Math.random() * 30) + 5;
        discountedPrice = parseFloat(
          (item.priceInDollar * (1 - discount / 100)).toFixed(2)
        );
        localStorage.setItem(
          key,
          JSON.stringify({ discount, discountedPrice })
        );
      }

      return { ...item, discountedPrice };
    });

    if (sortOption === "priceLow") {
      enriched.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOption === "priceHigh") {
      enriched.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortOption === "rating") {
      enriched.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "newest") {
      enriched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return enriched;
  }, [sortOption, data]);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(sortedData);
    }
  }, [sortedData, onChange]);

  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="w-full px-4 py-[0.55rem] border border-blue-400 rounded-lg text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      <option value="default">Sort by</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
      <option value="rating">Rating</option>
      <option value="newest">Newest</option>
    </select>
  );
}

export default SortController;