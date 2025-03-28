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
    DiscordLogo: "Discord",
    Envelope: "Contact",
    Globe: "Website",
    HouseLine: "Home",
    Briefcase: "Work",
    LinkSimple: "Link",
    Info: "Info"
  };

  useEffect(() => {
    async function fetchFooterData() {
      const { footerData } = await System.fetchCustomFooterIcons();
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
              Discord
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
        {footerData.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-300 py-2.5 px-4 rounded-md min-h-[40px] flex items-center justify-center w-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover hover:border-slate-100"
            aria-label={iconLabelMap[item.icon] || item.icon}
          >
            <span className="text-sm font-medium tracking-wide" style={{color: "var(--theme-sidebar-footer-icon-fill)"}}>
              {iconLabelMap[item.icon] || item.icon}
            </span>
          </a>
        ))}
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