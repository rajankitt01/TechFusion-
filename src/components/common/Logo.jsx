import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TechFusion Brand Logo Component
 * Renders the official TechFusion 3D emblem and logo asset.
 */
export function Logo({
  variant = 'full', // 'full' (image), 'emblem' (icon only), 'horizontal' (icon + text)
  size = 'md',      // 'sm', 'md', 'lg'
  linkTo = '/',
  className = '',
  onClick
}) {
  const heightClasses = {
    sm: 'h-9',
    md: 'h-11 md:h-12',
    lg: 'h-16 md:h-20',
  };

  const iconSizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const hClass = heightClasses[size] || heightClasses.md;
  const iClass = iconSizeClasses[size] || iconSizeClasses.md;
  const tClass = textClasses[size] || textClasses.md;

  let logoContent = null;

  if (variant === 'emblem') {
    logoContent = (
      <img
        src="/logo-icon.png"
        alt="TechFusion Emblem"
        className={`${iClass} object-contain rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105`}
      />
    );
  } else if (variant === 'horizontal') {
    logoContent = (
      <div className="flex items-center gap-3">
        <img
          src="/logo-icon.png"
          alt="TechFusion Emblem"
          className={`${iClass} object-contain rounded-lg shadow-md`}
        />
        <span className={`${tClass} font-black tracking-wider uppercase flex items-center`}>
          <span className="text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.4)]">TECH</span>
          <span className="text-[#000000] drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]">FUSION</span>
        </span>
      </div>
    );
  } else {
    // Default: Full uploaded brand logo image
    logoContent = (
      <img
        src="/logo.png"
        alt="TechFusion Logo"
        className={`${hClass} w-auto object-contain rounded-lg drop-shadow-[0_4px_16px_rgba(0,194,255,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_6px_22px_rgba(0,194,255,0.45)] group-hover:scale-[1.02]`}
      />
    );
  }

  const wrapperContent = (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none group cursor-pointer ${className}`}
    >
      {logoContent}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block">
        {wrapperContent}
      </Link>
    );
  }

  return wrapperContent;
}

export default Logo;
