import { Item } from '@/features/cart/types.ts';
import { MinusIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { formatMoney } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { useUpdateCartItem } from '@/features/cart/services/mutations.ts';

export const CartTable = ({
  cartID,
  items,
}: {
  cartID: string | null;
  items: Item[];
}) => {
  const { mutate: updateCartItem } = useUpdateCartItem();

  const handleUpdateCartItem = (itemID: string, quantity: number) => {
    if (!cartID) return;
    updateCartItem({ cartID, itemID, quantity });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S.N</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>SubTotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img
                src={item.product.images?.[0]}
                alt="Product Image"
                className={'object-cover rounded-lg size-16'}
              />
              <div>
                <h3 className={'font-semibold tracking-tight'}>
                  {item.product.title}
                </h3>
              </div>
            </TableCell>
            <TableCell>
              <div className={'flex items-center gap-4'}>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() =>
                    handleUpdateCartItem(item._id, item.quantity - 1)
                  }
                >
                  <MinusIcon className={'text-primary'} />
                </Button>
                {item.quantity}
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() =>
                    handleUpdateCartItem(item._id, item.quantity + 1)
                  }
                >
                  <PlusIcon className={'text-primary'} />
                </Button>
              </div>
            </TableCell>
            <TableCell>{formatMoney(item.price)}</TableCell>
            <TableCell className={'font-semibold'}>
              {formatMoney(item.subTotal)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
