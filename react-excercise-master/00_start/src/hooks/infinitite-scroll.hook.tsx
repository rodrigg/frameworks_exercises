import { useState, useEffect } from "react";

const useInfiniteScroll = () => {
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore]);
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetchingMore
    )
      return;
    setIsFetchingMore(true);
  }

  return { isFetchingMore, setIsFetchingMore };
};

export default useInfiniteScroll;
