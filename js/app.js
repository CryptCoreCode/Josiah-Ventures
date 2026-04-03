/* 1. SVG Icon Definitions */
const PLATFORM_ICONS = {
  twitch: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M1.5 0 0 4v17h6v3h3l3-3h4l8-8V0H1.5Zm21 12-4 4h-4l-3 3v-3H6V2h16v10ZM9 5h2v6H9V5Zm5 0h2v6h-2V5Z"/></svg>';
  },
  youtube: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M23.498 6.186a2.999 2.999 0 0 0-2.112-2.12C19.528 3.56 12 3.56 12 3.56s-7.527 0-9.386.506a3 3 0 0 0-2.112 2.12C0 8.055 0 12 0 12s0 3.945.502 5.814a3 3 0 0 0 2.112 2.12c1.859.506 9.386.506 9.386.506s7.528 0 9.386-.506a2.999 2.999 0 0 0 2.112-2.12C24 15.945 24 12 24 12s0-3.945-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/></svg>';
  },
  discord: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M20.317 4.37A19.791 19.791 0 0 0 15.885 3a13.91 13.91 0 0 0-.666 1.375 18.27 18.27 0 0 0-6.438 0A13.91 13.91 0 0 0 8.115 3a19.736 19.736 0 0 0-4.433 1.37C.88 8.66.113 12.842.477 16.965a19.93 19.93 0 0 0 5.993 3.03 14.44 14.44 0 0 0 1.286-2.106 12.97 12.97 0 0 1-2.037-.97c.171-.128.338-.262.5-.402 3.927 1.84 8.18 1.84 12.06 0 .164.14.33.274.5.402-.652.386-1.334.71-2.038.97a14.35 14.35 0 0 0 1.286 2.106 19.88 19.88 0 0 0 6-3.03c.427-4.778-.73-8.922-3.71-12.596ZM8.674 14.449c-1.183 0-2.158-1.085-2.158-2.419 0-1.334.956-2.418 2.158-2.418 1.203 0 2.178 1.094 2.158 2.418 0 1.334-.955 2.419-2.158 2.419Zm6.652 0c-1.183 0-2.158-1.085-2.158-2.419 0-1.334.956-2.418 2.158-2.418 1.203 0 2.178 1.094 2.158 2.418 0 1.334-.955 2.419-2.158 2.419Z"/></svg>';
  },
};

/* 2. Helper: Create Platform SVG */
function createPlatformIcon(platform) {
  const iconFactory = PLATFORM_ICONS[platform];
  return typeof iconFactory === "function" ? iconFactory() : "";
}

/* 3. Platform CTA Text Map */
const PLATFORM_CTA = {
  twitch: "Follow",
  youtube: "Subscribe",
  discord: "Join",
};

function createExternalLink(url) {
  return url || "#";
}

function applyExternalAttrs(anchor) {
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
}

function capitalize(value) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createClipPlayer(platform, id, title) {
  const wrapper = document.createElement("div");
  wrapper.className = "clip-card__player";

  const thumbnail = document.createElement("img");
  thumbnail.alt = title || "Featured clip";
  thumbnail.loading = "lazy";

  if (platform === "youtube") {
    thumbnail.src = "https://img.youtube.com/vi/" + encodeURIComponent(id) + "/maxresdefault.jpg";
  } else {
    thumbnail.src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + encodeURIComponent(id) + "-640x360.jpg";
  }

  const playOverlay = document.createElement("button");
  playOverlay.type = "button";
  playOverlay.className = "clip-card__play";
  playOverlay.setAttribute("aria-label", "Play video: " + (title || "clip"));
  playOverlay.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M8 5v14l11-7-11-7Z"/></svg>';

  const activateEmbed = function () {
    const iframe = document.createElement("iframe");
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.title = title || "Featured clip";

    if (platform === "youtube") {
      iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?autoplay=1";
    } else {
      iframe.src =
        "https://clips.twitch.tv/embed?clip=" +
        encodeURIComponent(id) +
        "&parent=" +
        encodeURIComponent(window.location.hostname) +
        "&autoplay=true";
    }

    wrapper.replaceChildren(iframe);
  };

  playOverlay.addEventListener("click", activateEmbed);
  wrapper.addEventListener("click", function (event) {
    if (event.target === wrapper || event.target === thumbnail) {
      activateEmbed();
    }
  });

  wrapper.append(thumbnail, playOverlay);
  return wrapper;
}

/* 4. Render Functions */
function renderHero() {
  const heroContent = document.querySelector(".hero__content");
  const tagline = document.querySelector(".hero__tagline");
  const games = document.querySelector(".hero__games");
  const primaryCta = document.querySelector(".hero__cta .btn--primary");
  const secondaryCta = document.querySelector(".hero__cta .btn--secondary");
  const twitchLink = createExternalLink(SITE_CONFIG?.platforms?.twitch);

  if (heroContent) {
    heroContent.setAttribute("data-reveal", "");
  }

  if (tagline) {
    tagline.textContent = SITE_CONFIG?.brand?.tagline || "";
  }

  if (games) {
    const heroSubtext = SITE_CONFIG?.brand?.heroSubtext || "";
    games.textContent = heroSubtext.toUpperCase();
  }

  if (primaryCta) {
    primaryCta.href = twitchLink;
    applyExternalAttrs(primaryCta);
  }

  if (secondaryCta) {
    secondaryCta.href = twitchLink;
    applyExternalAttrs(secondaryCta);
  }
}

function renderAbout() {
  const aboutContent = document.querySelector(".about__content");
  const bioElement = document.getElementById("about-bio");
  const tagsContainer = document.getElementById("about-tags");

  if (aboutContent) {
    aboutContent.setAttribute("data-reveal", "");
  }

  if (bioElement) {
    bioElement.textContent = SITE_CONFIG?.about?.bio || "";
  }

  if (!tagsContainer) {
    return;
  }

  tagsContainer.setAttribute("data-reveal", "");
  tagsContainer.innerHTML = "";
  const interests = SITE_CONFIG?.about?.interests || [];

  interests.forEach(function (interest) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = interest;
    tagsContainer.appendChild(tag);
  });
}

function renderStats() {
  const statsGrid = document.getElementById("stats-grid");
  if (!statsGrid) {
    return;
  }

  statsGrid.innerHTML = "";
  const stats = SITE_CONFIG?.stats || [];

  stats.forEach(function (item, index) {
    const card = document.createElement("div");
    card.className = "stat-card card";
    card.setAttribute("data-reveal", "");
    if (index > 0) {
      card.setAttribute("data-reveal-delay", (index * 0.1) + "s");
    }

    const value = document.createElement("div");
    value.className = "stat-card__value";
    value.textContent = item?.value || "";

    const label = document.createElement("div");
    label.className = "stat-card__label";
    label.textContent = item?.label || "";

    card.append(value, label);
    statsGrid.appendChild(card);
  });
}

function renderClips() {
  const clipsGrid = document.getElementById("clips-grid");
  if (!clipsGrid) {
    return;
  }

  const clips = SITE_CONFIG?.featuredClips || [];
  if (!clips.length) {
    clipsGrid.hidden = true;
    clipsGrid.innerHTML = "";
    return;
  }

  clipsGrid.hidden = false;
  clipsGrid.innerHTML = "";

  clips.forEach(function (clip, index) {
    if (!clip || !clip.id || !clip.platform || !["youtube", "twitch"].includes(clip.platform)) {
      return;
    }

    const card = document.createElement("article");
    card.className = "clip-card card";
    card.setAttribute("data-reveal", "");
    if (index > 0) {
      card.setAttribute("data-reveal-delay", (index * 0.1) + "s");
    }

    const player = createClipPlayer(clip.platform, clip.id, clip.title || "Featured clip");
    const title = document.createElement("h3");
    title.className = "clip-card__title";
    title.textContent = clip.title || "Featured clip";

    card.append(player, title);
    clipsGrid.appendChild(card);
  });
}

function renderSchedule() {
  const timezoneLabel = document.getElementById("schedule-tz");
  const scheduleCard = document.getElementById("schedule-card");

  if (timezoneLabel) {
    const timezone = SITE_CONFIG?.timezone || "";
    if (timezone) {
      timezoneLabel.textContent = "All times " + timezone;
      timezoneLabel.hidden = false;
    } else {
      timezoneLabel.textContent = "";
      timezoneLabel.hidden = true;
    }
  }

  if (!scheduleCard) {
    return;
  }

  scheduleCard.setAttribute("data-reveal", "");
  const communityHeading = document.querySelector(".community__heading");
  if (communityHeading) {
    communityHeading.setAttribute("data-reveal", "");
  }
  const schedule = SITE_CONFIG?.schedule || [];

  if (!schedule.length) {
    scheduleCard.innerHTML = '<div class="schedule__empty">Schedule coming soon — follow to stay updated!</div>';
    return;
  }

  scheduleCard.innerHTML = "";

  schedule.forEach(function (entry) {
    const row = document.createElement("div");
    row.className = "schedule__row";

    const day = document.createElement("span");
    day.className = "schedule__day";
    day.textContent = entry?.day || "";

    const time = document.createElement("span");
    time.className = "schedule__time";
    time.textContent = (entry?.startTime || "") + " – " + (entry?.endTime || "");

    const game = document.createElement("span");
    game.className = "schedule__game";
    game.textContent = entry?.game || "";

    row.append(day, time, game);
    scheduleCard.appendChild(row);
  });
}

function renderCommunity() {
  const platformsContainer = document.getElementById("community-platforms");
  if (!platformsContainer) {
    return;
  }

  platformsContainer.innerHTML = "";
  const platforms = SITE_CONFIG?.platforms || {};

  let cardIndex = 0;
  Object.entries(platforms).forEach(function (entry) {
    const platform = entry[0];
    const url = entry[1];
    if (!url) {
      return;
    }

    const card = document.createElement("a");
    card.className = "platform-card card";
    card.href = url;
    card.setAttribute("data-reveal", "");
    if (cardIndex > 0) {
      card.setAttribute("data-reveal-delay", (cardIndex * 0.1) + "s");
    }
    applyExternalAttrs(card);
    cardIndex += 1;

    const icon = document.createElement("div");
    icon.className = "platform-card__icon";
    icon.innerHTML = createPlatformIcon(platform);

    const name = document.createElement("div");
    name.className = "platform-card__name";
    name.textContent = capitalize(platform);

    const action = document.createElement("div");
    action.className = "platform-card__action";
    action.textContent = PLATFORM_CTA[platform] || "Visit";

    card.append(icon, name, action);
    platformsContainer.appendChild(card);
  });
}

function renderFooter() {
  const socials = document.getElementById("footer-socials");
  const contact = document.getElementById("footer-contact");
  const copyright = document.querySelector(".footer__copyright");
  const platforms = SITE_CONFIG?.platforms || {};

  if (socials) {
    socials.innerHTML = "";

    Object.entries(platforms).forEach(function (entry) {
      const platform = entry[0];
      const url = entry[1];
      if (!url) {
        return;
      }

      const link = document.createElement("a");
      link.href = url;
      link.innerHTML = createPlatformIcon(platform);
      link.setAttribute("aria-label", "Follow on " + capitalize(platform));
      applyExternalAttrs(link);

      socials.appendChild(link);
    });
  }

  if (contact) {
    const email = SITE_CONFIG?.footer?.contactEmail || "";
    if (email) {
      contact.hidden = false;
      contact.innerHTML = 'Business inquiries: <a href="mailto:' + email + '">' + email + "</a>";
    } else {
      contact.hidden = true;
      contact.innerHTML = "";
    }
  }

  if (copyright) {
    const year = SITE_CONFIG?.footer?.copyrightYear || new Date().getFullYear();
    const name = SITE_CONFIG?.brand?.name || "";
    copyright.textContent = "© " + year + " " + name;
  }
}

let twitchEmbedInitAttempts = 0;

function initTwitchEmbed() {
  const embedContainer = document.getElementById("twitch-embed");
  if (!embedContainer) {
    return;
  }

  if (typeof window.Twitch === "undefined") {
    if (twitchEmbedInitAttempts >= 5) {
      return;
    }

    twitchEmbedInitAttempts += 1;
    setTimeout(initTwitchEmbed, 500);
    return;
  }

  const embed = new Twitch.Embed("twitch-embed", {
    channel: SITE_CONFIG.twitch.channel,
    width: "100%",
    height: "100%",
    layout: "video",
    parent: SITE_CONFIG.twitch.parents,
    autoplay: false,
    muted: true,
  });

  embed.addEventListener(Twitch.Embed.VIDEO_PLAY, function () {
    document.body.classList.add("is-live");

    const liveBadge = document.querySelector(".hero__live-badge");
    if (liveBadge) {
      liveBadge.removeAttribute("hidden");
    }
  });
}

/* 5. Init */
function init() {
  renderHero();
  renderAbout();
  renderStats();
  renderClips();
  renderSchedule();
  renderCommunity();
  renderFooter();
  initTwitchEmbed();
}

document.addEventListener("DOMContentLoaded", function () {
  init();

  /* Scroll Reveal Logic */
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;
          const delay = element.getAttribute("data-reveal-delay");
          
          if (delay) {
            element.style.transitionDelay = delay;
          }
          
          element.classList.add("revealed");
          revealObserver.unobserve(element);
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(function (element) {
      element.classList.add("revealed");
    });
  }

  const siteHeader = document.getElementById("site-header");
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const observedSections = document.querySelectorAll("section[id]");
  const navToggle = document.querySelector(".nav__toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener(
    "scroll",
    function () {
      if (!siteHeader) {
        return;
      }

      siteHeader.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true }
  );

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", window.scrollY > 50);
  }

  if (navLinks.length && observedSections.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.id;
          const matchingLink = navLinks.find(function (link) {
            return link.getAttribute("href")?.endsWith("#" + sectionId);
          });

          if (!matchingLink) {
            return;
          }

          navLinks.forEach(function (link) {
            link.classList.toggle("active", link === matchingLink);
          });
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    observedSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  if (navToggle && mobileMenu) {
    const closeMobileMenu = function () {
      mobileMenu.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", function () {
      const isOpen = !mobileMenu.hidden;
      mobileMenu.hidden = isOpen;
      navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });

    mobileMenu.addEventListener("click", function (event) {
      const clickedLink = event.target.closest("a");
      if (clickedLink) {
        closeMobileMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (mobileMenu.hidden) {
        return;
      }

      const clickInsideMenu = mobileMenu.contains(event.target);
      const clickOnToggle = navToggle.contains(event.target);

      if (!clickInsideMenu && !clickOnToggle) {
        closeMobileMenu();
      }
    });
  }
});