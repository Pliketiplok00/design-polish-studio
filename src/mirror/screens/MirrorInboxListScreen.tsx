/**
 * Mirror Inbox List Screen (Web Version)
 * 
 * Recreates MirrorInboxListScreen for web rendering.
 */

import React, { useState } from 'react';
import { skin } from '../skin';
import { Icon, type IconName } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { H2, Label, Body, Meta, ButtonText } from '../primitives/Text';
import {
  inboxMessagesFixture,
  sentItemsFixture,
  inboxLabels,
  STATUS_COLORS,
  type InboxMessage,
  type InboxTag,
  type CombinedSentItemFixture,
} from '../fixtures/inbox';

type TabType = 'received' | 'sent';

function getMessageIconConfig(tags: InboxTag[], isUrgent: boolean): { icon: IconName; background: string } {
  if (isUrgent) return { icon: 'alert-triangle', background: skin.colors.urgent };
  if (tags.includes('promet')) return { icon: 'ship', background: skin.colors.teal };
  if (tags.includes('kultura')) return { icon: 'calendar', background: skin.colors.lavender };
  if (tags.includes('opcenito')) return { icon: 'message-circle', background: skin.colors.backgroundSecondary };
  return { icon: 'mail', background: skin.colors.backgroundSecondary };
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}.`;
}

export function MirrorInboxListScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('received');
  const messages = inboxMessagesFixture;
  const sentItems = sentItemsFixture;
  const unreadIds = new Set([messages[0]?.id, messages[1]?.id]);

  const handleMessagePress = (): void => {};
  const handleSentItemPress = (): void => {};
  const handleNewFeedback = (): void => {};
  const handleNewClickFix = (): void => {};

  const renderMessage = (item: InboxMessage): React.JSX.Element => {
    const unread = unreadIds.has(item.id);
    const { icon, background } = getMessageIconConfig(item.tags, item.is_urgent);

    return (
      <div key={item.id} style={styles.messageItemWrapper}>
        <div style={styles.messageItemShadow} />
        <button style={styles.messageItem} onClick={handleMessagePress}>
          <div style={{ ...styles.iconSlab, backgroundColor: background }}>
            <Icon
              name={icon}
              size="md"
              color={item.is_urgent ? skin.colors.primaryText : skin.colors.textPrimary}
            />
          </div>
          <div style={styles.messageContent}>
            <ButtonText style={styles.messageTitle}>{item.title}</ButtonText>
            <Body color={skin.colors.textMuted} style={styles.messagePreview} numberOfLines={2}>
              {item.body}
            </Body>
            <Meta>{formatDateShort(item.created_at)}</Meta>
          </div>
          <div style={styles.messageRight}>
            {unread && (
              <div style={styles.newBadge}>
                <Label style={styles.newBadgeText}>{inboxLabels.badges.new}</Label>
              </div>
            )}
            <div style={styles.chevronBox}>
              <Icon name="chevron-right" size="sm" colorToken="chevron" />
            </div>
          </div>
        </button>
      </div>
    );
  };

  const renderSentItem = (item: CombinedSentItemFixture): React.JSX.Element => {
    const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.zaprimljeno;
    const isClickFix = item.type === 'click_fix';
    const iconName: IconName = isClickFix ? 'camera' : 'send';
    const iconBackground = isClickFix ? skin.colors.orange : skin.colors.lavender;

    return (
      <div key={item.id} style={styles.messageItemWrapper}>
        <div style={styles.messageItemShadow} />
        <button style={styles.messageItem} onClick={handleSentItemPress}>
          <div style={{ ...styles.iconSlab, backgroundColor: iconBackground }}>
            <Icon name={iconName} size="md" colorToken="textPrimary" />
          </div>
          <div style={styles.messageContent}>
            <ButtonText style={styles.messageTitle}>{item.subject}</ButtonText>
            <div style={styles.badgeRow}>
              {isClickFix && (
                <Badge variant="type" style={{ marginRight: skin.spacing.xs }}>
                  {inboxLabels.badges.report}
                </Badge>
              )}
              <Badge backgroundColor={statusColor.bg} textColor={statusColor.text}>
                {item.status_label}
              </Badge>
            </div>
            {isClickFix && item.photo_count !== undefined && item.photo_count > 0 && (
              <Meta style={styles.photoCount}>
                {item.photo_count} {inboxLabels.photoCount}
              </Meta>
            )}
            <Meta>{formatDateShort(item.created_at)}</Meta>
          </div>
          <div style={styles.messageRight}>
            <div style={styles.chevronBox}>
              <Icon name="chevron-right" size="sm" colorToken="chevron" />
            </div>
          </div>
        </button>
      </div>
    );
  };

  const renderEmptyState = (): React.JSX.Element => (
    <div style={styles.emptyState}>
      <Icon name="inbox" size="xl" colorToken="textDisabled" />
      <H2 style={{ marginTop: skin.spacing.md }}>{inboxLabels.empty.title}</H2>
      <Body style={{ color: skin.colors.textMuted }}>
        {activeTab === 'received' ? inboxLabels.empty.received : inboxLabels.empty.sentHint}
      </Body>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Mirror header */}
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>InboxList Mirror</H2>
        <Meta style={styles.headerMeta}>
          fixture: {activeTab === 'received' ? 'inboxMessagesFixture' : 'sentItemsFixture'}
        </Meta>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'received' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('received')}
        >
          <Icon
            name="inbox"
            size="sm"
            color={activeTab === 'received' ? skin.colors.primaryText : skin.colors.textPrimary}
          />
          <Label style={{ ...(activeTab === 'received' ? { color: skin.colors.primaryText } : {}) }}>
            {inboxLabels.tabs.received}
          </Label>
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'sent' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('sent')}
        >
          <Icon
            name="send"
            size="sm"
            color={activeTab === 'sent' ? skin.colors.primaryText : skin.colors.textPrimary}
          />
          <Label style={{ ...(activeTab === 'sent' ? { color: skin.colors.primaryText } : {}) }}>
            {inboxLabels.tabs.sent}
          </Label>
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === 'received' ? (
          messages.length > 0 ? (
            <div style={styles.messageList}>
              {messages.map(renderMessage)}
            </div>
          ) : renderEmptyState()
        ) : (
          <div style={styles.sentContainer}>
            {sentItems.length > 0 ? (
              <div style={styles.messageList}>
                {sentItems.map(renderSentItem)}
              </div>
            ) : renderEmptyState()}
            <div style={styles.newFeedbackContainer}>
              <Button onPress={handleNewFeedback} style={{ marginBottom: skin.spacing.sm }}>
                {inboxLabels.actions.newMessage}
              </Button>
              <Button variant="secondary" onPress={handleNewClickFix}>
                {inboxLabels.actions.reportProblem}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: skin.colors.background,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.backgroundTertiary,
  },
  headerTitle: {
    marginBottom: skin.spacing.xs,
  },
  headerMeta: {
    color: skin.colors.textMuted,
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: skin.spacing.sm,
    padding: skin.spacing.lg,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    borderBottom: 'none',
    cursor: 'pointer',
  },
  tabActive: {
    backgroundColor: skin.colors.primary,
    borderColor: skin.colors.primary,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
  messageList: {
    padding: skin.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
  messageItemWrapper: {
    position: 'relative',
  },
  messageItemShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: skin.colors.border,
    borderRadius: skin.borders.radiusCard,
  },
  messageItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: skin.colors.background,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    borderRadius: skin.borders.radiusCard,
    padding: skin.spacing.md,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  iconSlab: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    marginRight: skin.spacing.md,
    flexShrink: 0,
  },
  messageContent: {
    flex: 1,
    minWidth: 0,
  },
  messageTitle: {
    marginBottom: skin.spacing.xs,
    textTransform: 'uppercase',
  },
  messagePreview: {
    marginBottom: skin.spacing.xs,
    margin: 0,
  },
  messageRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: skin.spacing.sm,
  },
  newBadge: {
    backgroundColor: skin.colors.accent,
    padding: skin.spacing.xs,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    marginBottom: skin.spacing.sm,
  },
  newBadgeText: {
    fontSize: skin.typography.fontSize.xs,
  },
  chevronBox: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthHairline}px solid ${skin.colors.borderLight}`,
  },
  badgeRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: skin.spacing.sm,
    marginBottom: skin.spacing.xs,
  },
  photoCount: {
    marginBottom: skin.spacing.xs,
  },
  sentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  newFeedbackContainer: {
    padding: skin.spacing.lg,
    borderTop: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.background,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: skin.spacing.xxxl,
    textAlign: 'center',
  },
};

export default MirrorInboxListScreen;
