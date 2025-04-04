import System from "@/models/system";
import paths from "@/utils/paths";
import {
  BookOpen,
  DiscordLogo,
  GithubLogo,
  Briefcase,
  Envelope,
  Globe,
  HouseLine,
  Info,
  LinkSimple,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import SettingsButton from "../SettingsButton";
import { isMobile } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

export const MAX_ICONS = 3;
export const ICON_COMPONENTS = {
  BookOpen: BookOpen,
  DiscordLogo: DiscordLogo,
  GithubLogo: GithubLogo,
  Envelope: Envelope,
  LinkSimple: LinkSimple,
  HouseLine: HouseLine,
  Globe: Globe,
  Briefcase: Briefcase,
  Info: Info,
};

export default function Footer() {
  const [footerData, setFooterData] = useState(false);
  const iconLabelMap = {
    GithubLogo: "GitHub",
    BookOpen: "Docs",
    DiscordLogo: "Memories",
    Envelope: "Contact",
    Globe: "Website",
    HouseLine: "Calendar",
    Briefcase: "Work",
    LinkSimple: "Link",
    Info: "Logs"
  };

  useEffect(() => {
    async function fetchFooterData() {
      // Clear the cache to force a refresh from the server
      localStorage.removeItem('anythingllm_footer_links');
      // Add a timestamp to break any potential caching issues
      const { footerData } = await System.fetchCustomFooterIcons(true);
      console.log("Footer data:", footerData); // Debug log
      setFooterData(footerData);
    }
    fetchFooterData();
  }, []);

  // wait for some kind of non-false response from footer data first
  // to prevent pop-in.
  if (footerData === false) return null;

  if (!Array.isArray(footerData) || footerData.length === 0) {
    return (
      <div className="flex flex-col mx-2 my-3">
        <div className="flex flex-col space-y-3 max-w-[200px] mx-auto w-full">
          <Link
            to={paths.github()}
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-300 py-2.5 px-4 rounded-md min-h-[40px] flex items-center justify-center w-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
            aria-label="Find us on GitHub"
            data-tooltip-id="footer-item"
            data-tooltip-content="View source code on GitHub"
          >
            <span className="text-sm font-medium tracking-wide" style={{color: "var(--theme-sidebar-footer-icon-fill)"}}>
              GitHub
            </span>
          </Link>
          <Link
            to={paths.docs()}
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-300 py-2.5 px-4 rounded-md min-h-[40px] flex items-center justify-center w-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
            aria-label="Docs"
            data-tooltip-id="footer-item"
            data-tooltip-content="Open AnythingLLM help docs"
          >
            <span className="text-sm font-medium tracking-wide" style={{color: "var(--theme-sidebar-footer-icon-fill)"}}>
              Docs
            </span>
          </Link>
          <Link
            to={paths.discord()}
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-300 py-2.5 px-4 rounded-md min-h-[40px] flex items-center justify-center w-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
            aria-label="Join our Discord server"
            data-tooltip-id="footer-item"
            data-tooltip-content="Join the AnythingLLM Discord"
          >
            <span className="text-sm font-medium tracking-wide" style={{color: "var(--theme-sidebar-footer-icon-fill)"}}>
              Memories
            </span>
          </Link>
          {!isMobile && <SettingsButton />}
        </div>
        <Tooltip
          id="footer-item"
          place="top"
          delayShow={300}
          className="tooltip !text-xs z-99"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-2 my-3">
      <div className="flex flex-col space-y-3 max-w-[200px] mx-auto w-full">
        {footerData.map((item, index) => {
          // Force specific names for specific icons
          let displayName;
          if (item.icon === "DiscordLogo") {
            displayName = "Memories";
          } else if (item.icon === "Info") {
            displayName = "Logs";
          } else if (item.icon === "HouseLine") {
            displayName = "Calendar";
          } else {
            displayName = item.label || iconLabelMap[item.icon] || item.icon;
          }
          
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 py-2.5 px-4 rounded-md min-h-[40px] flex items-center justify-center w-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover hover:border-slate-100"
              aria-label={displayName}
            >
              <span className="text-sm font-medium tracking-wide" style={{color: "var(--theme-sidebar-footer-icon-fill)"}}>
                {displayName}
              </span>
            </a>
          );
        })}
        {!isMobile && <SettingsButton />}
      </div>
      <Tooltip
        id="footer-item"
        place="top"
        delayShow={300}
        className="tooltip !text-xs z-99"
      />
    </div>
  );
}