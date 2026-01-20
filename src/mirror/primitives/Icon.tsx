/**
 * Icon Primitive (Web Version)
 * 
 * Recreates the Icon component using lucide-react for web.
 */

import React from 'react';
import {
  Menu,
  Inbox,
  Home,
  Calendar,
  Bus,
  Ship,
  Anchor,
  Leaf,
  Info,
  Wrench,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Settings,
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  X,
  AlertTriangle,
  Send,
  MailOpen,
  Camera,
  Check,
  Clock,
  MapPin,
  User,
  type LucideIcon,
} from 'lucide-react';
import { skin, type SkinColors, type IconSize } from '../skin';

export type IconName =
  | 'menu'
  | 'inbox'
  | 'home'
  | 'calendar'
  | 'bus'
  | 'ship'
  | 'anchor'
  | 'leaf'
  | 'info'
  | 'wrench'
  | 'message-circle'
  | 'phone'
  | 'mail'
  | 'mail-open'
  | 'globe'
  | 'settings'
  | 'file-text'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'chevron-down'
  | 'close'
  | 'alert-triangle'
  | 'send'
  | 'camera'
  | 'check'
  | 'clock'
  | 'map-pin'
  | 'user';

const ICON_MAP: Record<IconName, LucideIcon> = {
  'menu': Menu,
  'inbox': Inbox,
  'home': Home,
  'calendar': Calendar,
  'bus': Bus,
  'ship': Ship,
  'anchor': Anchor,
  'leaf': Leaf,
  'info': Info,
  'wrench': Wrench,
  'message-circle': MessageCircle,
  'phone': Phone,
  'mail': Mail,
  'mail-open': MailOpen,
  'globe': Globe,
  'settings': Settings,
  'file-text': FileText,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'close': X,
  'alert-triangle': AlertTriangle,
  'send': Send,
  'camera': Camera,
  'check': Check,
  'clock': Clock,
  'map-pin': MapPin,
  'user': User,
};

interface IconProps {
  name: IconName;
  size?: IconSize;
  colorToken?: SkinColors;
  color?: string;
  className?: string;
}

export function Icon({
  name,
  size = 'md',
  colorToken = 'textPrimary',
  color,
  className,
}: IconProps): React.JSX.Element {
  const IconComponent = ICON_MAP[name];
  const iconSize = skin.icons.size[size];
  const iconColor = color ?? skin.colors[colorToken];

  if (!IconComponent) {
    return (
      <span
        className={className}
        style={{
          width: iconSize,
          height: iconSize,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px dashed ${iconColor}`,
          borderRadius: 4,
          fontSize: iconSize * 0.4,
          color: iconColor,
        }}
      >
        ?
      </span>
    );
  }

  return (
    <IconComponent
      size={iconSize}
      strokeWidth={skin.icons.strokeWidth.regular}
      color={iconColor}
      className={className}
    />
  );
}

export default Icon;
