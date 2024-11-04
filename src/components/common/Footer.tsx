export const Footer = () => {
  return (
    <footer className={'py-4 border-t mb-24 sm:mb-0 bg-white z-40 isolate'}>
      <div
        className={
          'flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center'
        }
      >
        <p className={'text-muted-foreground text-sm'}>
          Copyright &copy; 2024. All Rights Reserved.
        </p>
        <p className={'text-primary'}>
          The&nbsp;
          <span className={'font-semibold'}>
            <span className={'text-black'}>S</span>B
          </span>
          &nbsp;Team
        </p>
      </div>
    </footer>
  );
};
