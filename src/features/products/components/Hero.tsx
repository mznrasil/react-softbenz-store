import Banner from '@/assets/banner.png';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section>
      <div
        className={
          'max-h-[600px] min-h-[200px] relative rounded-2xl overflow-hidden stack'
        }
      >
        <img
          src={Banner}
          alt="Banner"
          className={'w-full h-full object-cover'}
        />
        <div
          className={
            'absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 md:from-transparent md:to-black/70'
          }
        />
        <div
          className={
            'p-8 self-end isolate text-white flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 sm:gap-0'
          }
        >
          <div>
            <h1 className={'text-3xl md:text-4xl font-bold'}>
              SoftBenz Collection
            </h1>
            <p className={'mt-2 max-w-2xl text-white/70 hidden sm:block'}>
              Browse amazing products from the SoftBenz Collection. They have
              the best products in town.
            </p>
          </div>
          <Button>
            <Link to={'/products'}>Buy Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
