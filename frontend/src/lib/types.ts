export const RewardType = {
  ERC20: 'ERC20',
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
} as const;

export type RewardType = typeof RewardType[keyof typeof RewardType];
