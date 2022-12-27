import React, { useEffect, useState } from "react";

const useDocumentTitle = (title) => {
  const [doctitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = `Wind Kite Spots - ${doctitle}`;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export { useDocumentTitle };
