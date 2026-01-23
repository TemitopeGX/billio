"use client";

export default function TrustStats() {
  const stats = [
    { id: 1, value: "10,000+", label: "Businesses" },
    { id: 2, value: "₦50M+", label: "Invoices Processed" },
    { id: 3, value: "99.9%", label: "Uptime" },
    { id: 4, value: "24/7", label: "Support" },
  ];

  return (
    <div className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center"
            >
              <dt className="text-2xl font-bold text-[#1E3A8A] md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
