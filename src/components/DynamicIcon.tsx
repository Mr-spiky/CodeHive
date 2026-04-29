"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * A helper component to render Lucide icons dynamically based on their string name.
 * Prevents multiple imports in every component and ensures consistent styling.
 */
export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // @ts-ignore - Dynamic key access
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;

  return <IconComponent {...props} />;
};
