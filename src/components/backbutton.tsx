export const BackButton = (props: { colour?: string }) => {
  let cn = "mr-2 inline-flex rotate-180 items-center rounded-full bg-slate-600 p-2.5 text-center text-sm font-medium text-white hover:bg-slate-500 focus:outline-none  dark:bg-slate-600 dark:hover:bg-slate-500";
  if (props.colour === "black") {
    cn = "mr-2 inline-flex rotate-180 items-center rounded-full bg-black p-2.5 text-center text-sm font-medium text-white hover:bg-slate-900 focus:outline-none  dark:black dark:hover:bg-slate-900";
  }
  return (
    <button
      type="button"
      className={cn}
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Icon description</span>
    </button>
  );
};
