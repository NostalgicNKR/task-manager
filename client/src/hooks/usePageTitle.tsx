import { useEffect } from "react";
import useTitleStore from "../store/titleStore";

const usePageTitle = (title: string) => {
  const pageTitle = useTitleStore();

  useEffect(() => {
    pageTitle.setTitle(title);
  }, [title]);
};

export default usePageTitle;
