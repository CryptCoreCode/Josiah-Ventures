const SITE_CONFIG = {

  // ── Brand ────────────────────────────────────────────────
  brand: {
    name: "NotRatMaster",
    tagline: "Building something cool, one stream at a time.",
    heroSubtext: "Apex Legends · Geometry Dash · PEAK",
  },

  // ── Platform Links ──────────────────────────────────────
  platforms: {
    twitch:  "https://twitch.tv/notratmaster",
    youtube: "https://youtube.com/@notratmaster",
    // discord: "https://discord.gg/CHANNEL_NAME",
  },

  // ── Twitch Embed ────────────────────────────────────────
  twitch: {
    channel: "notratmaster",
    parents: ["josiah.ventures", "cryptcorecode.github.io"],
  },

  // ── Schedule ────────────────────────────────────────────
  schedule: [
    { day: "Weekdays",   startTime: "5:00 PM", endTime: "8:00 PM", game: "Apex Legends" },
    { day: "Saturday", startTime: "4:00 PM", endTime: "8:00 PM", game: "Apex Legends" },
    { day: "Sunday",   startTime: "3:00 PM", endTime: "8:00 PM", game: "Apex Legends" },
  ],
  timezone: "EST",

  // ── Stats (manually updated) ────────────────────────────
  stats: [
    { label: "Twitch Followers", value: "~500" },
    { label: "YouTube Subscribers", value: "~20" },
    { label: "Streams This Month", value: "~15" },
  ],

  // ── Featured Clips / Videos ─────────────────────────────
  featuredClips: [
    // Add objects like: { platform: "youtube", id: "dQw4w9WgXcQ", title: "Clip title" }
  ],

  // ── About ───────────────────────────────────────────────
  about: {
    bio: "Hey! I'm NotRatMaster - a streamer who loves fast-paced games, creative challenges, and hanging out with a chill community. I stream Apex Legends, Geometry Dash, and PEAK.",
    interests: ["Apex Legends", "Geometry Dash", "PEAK"],
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    contactEmail: "contact@notratmaster",
    copyrightYear: 2026,
  },
};