export const TailwindIndicator = () => {
  return (
    <div className="absolute bottom-0 left-0 z-50 bg-pink-500 text-white shadow-md px-2 rounded-tr-xl font-mono">
      <span className="sm:hidden">default</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline">xl</span>
    </div>
  )
}
