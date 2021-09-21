/**
 * Drawer transfer interface.
 */
export interface DrawerTransfer {
  transferFromDrawerId: string;
  transferToDrawerId: string;
  description?: string;
  transferAmount: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
