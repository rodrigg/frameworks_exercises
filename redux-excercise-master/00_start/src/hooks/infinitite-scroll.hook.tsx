import { useState, useEffect } from "react";

const useInfiniteScroll = (
  isFetchingMore: boolean,
  setIsFetchingMore: (fetching: boolean) => void
) => {
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
};

export default useInfiniteScroll;
