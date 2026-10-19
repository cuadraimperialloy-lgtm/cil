interface GoldTickerProps {
  items: string[];
}

export default function GoldTicker({ items }: GoldTickerProps) {
  // Duplicate for smooth seamless looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-gradient-to-r from-[#B8892B] via-[#D4AF37] to-[#F1D27A] py-2 sm:py-2.5 overflow-hidden text-[#0B0B0B] font-bold text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] shadow-lg relative z-20">
      <div className="animate-ticker flex items-center whitespace-nowrap">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-4 sm:mx-6">{item}</span>
            <span className="text-[#0B0B0B]/50 text-xs sm:text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
