export const services = {
  wood: {
    slug: "wood",
    title: "Wood Fences",
    teaser: "Premium, custom-built privacy",
    intro:
      "Wood fencing is a timeless choice that blends naturally with any property, offering privacy and a warm, welcoming feel. Its adaptability makes it suitable for both residential and commercial settings, giving you the flexibility to design a fence that fits your exact needs. A wood fence also creates a natural sound barrier, reducing outside noise and enhancing comfort in outdoor spaces. Many homeowners choose wood because it provides an inviting backdrop that adds character and value to a property. Above all, a properly built wood fence provides both function and beauty that lasts for years.",
    bullets: [
      "Creates privacy and reduces outside noise",
      "Enhances curb appeal and property value",
      "Flexible design options to suit any property",
      "Adds a natural, welcoming look to outdoor spaces",
      "Strong choice for both residential and commercial use",
    ],
  },

  steel: {
    slug: "steel",
    title: "Steel Fences",
    teaser: "Heavy-duty security",
    intro:
      "Steel fencing is chosen when maximum strength and security are the top priorities. It stands up to impact and daily wear, making it ideal for protecting property boundaries with confidence. Because of its durability, steel fencing offers peace of mind for years to come without frequent upkeep. It provides a professional and commanding appearance that reinforces the value of your property. For those who want long-lasting reliability, steel fences are an investment in both protection and peace of mind.",
    bullets: [
      "Delivers unmatched strength and security",
      "Provides long-term reliability",
      "Minimal upkeep required",
      "Enhances the professional look of any property",
      "Ideal for areas requiring a strong barrier",
    ],
  },

  vinyl: {
    slug: "vinyl",
    title: "Vinyl (PVC) Fences",
    teaser: "Clean, consistent privacy",
    intro:
      "Vinyl fencing is popular for its clean, consistent appearance and the ease of keeping it looking new. Unlike some options that require frequent maintenance, vinyl maintains its look with little effort. It is especially useful for those who want dependable privacy without worrying about fading or wear. Vinyl fences provide uniformity across long stretches, making them a great option for large residential or community properties. With their long-lasting design, vinyl fences combine convenience with reliable performance.",
    bullets: [
      "Maintains a clean, uniform appearance",
      "Provides reliable privacy year-round",
      "Low-maintenance compared to other fencing styles",
      "Ideal for large residential or community spaces",
      "Long-lasting and consistent performance",
    ],
  },

  "chain-link": {
    slug: "chain-link",
    title: "Chain Link Fences",
    teaser: "Durable perimeter and security",
    intro:
      "Chain link fencing is a practical choice for creating secure perimeters without obstructing visibility. Its open design makes it suitable for properties that require monitoring while still maintaining a barrier. This type of fencing is also budget-friendly, providing dependable protection at a cost-effective rate. Chain link fences are quick to install and easy to repair, making them a reliable option for busy environments. Whether for homes, schools, or businesses, chain link fences provide long-term functionality and convenience.",
    bullets: [
      "Affordable while still offering strong protection",
      "Keeps visibility open while securing boundaries",
      "Quick installation with minimal disruption",
      "Easy to repair or adjust over time",
      "Ideal for both residential and commercial properties",
    ],
  },

  aluminum: {
    slug: "aluminum",
    title: "Aluminum Fences",
    teaser: "Classic & corrosion resistant",
    intro:
      "Aluminum fencing offers the perfect balance of strength and elegance. It is commonly chosen for its sleek appearance, which adds sophistication to any property. At the same time, it provides reliable security without the need for heavy upkeep. Its adaptability makes it suitable for a wide range of property layouts, from residential yards to commercial spaces. Many property owners choose aluminum fencing to combine durability with an attractive design that endures.",
    bullets: [
      "Blends strength with an elegant look",
      "Low maintenance while staying reliable",
      "Adapts to many property layouts and needs",
      "Improves the appearance of outdoor spaces",
      "Provides security with long-term value",
    ],
  },

  gates: {
    slug: "gates",
    title: "Gates & Access Control",
    teaser: "Ease of access",
    intro:
      "A fence is only complete with the right gate to provide secure and convenient access. Gates enhance the overall flow of a property, ensuring that entry and exit are simple while maintaining security. They can be tailored to residential, community, or commercial needs, making them versatile in application. Automated options bring added convenience by allowing controlled access with ease. When combined with fencing, gates provide both function and an added layer of safety for any property.",
    bullets: [
      "Improves access while maintaining security",
      "Available for residential, community, and commercial properties",
      "Automated options provide convenience and control",
      "Completes the functionality of any fencing system",
      "Adds both safety and value to a property",
    ],
  },
};

// helper functions
export const getService = (slug) => services[slug];
export const allServices = Object.values(services);