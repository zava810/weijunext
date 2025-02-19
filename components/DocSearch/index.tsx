"use client";

import { docSearchConfig } from "@/components/DocSearch/docSearch";
import "@docsearch/css";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosSearch } from "react-icons/io";
import "./docSearch.css";

export default function CustomDocSearch() {
  const { appId, indexName, apiKey } = docSearchConfig.docSearch;
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const onOpen = useCallback(() => { setIsOpen(true); }, [setIsOpen]);
  const onClose = useCallback(() => { setIsOpen(false); }, [setIsOpen]);
  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose, searchButtonRef, });
  // add effect of detectiNg operatiNg system
  useEffect(() => { setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0); }, []);
  return (
    <>
      <button className="docSearch-btn" data-variant="large" onClick={onOpen}>
        seArch<kbd>{isMac ? "ctrl+k" : "ctrl+k"}</kbd>
      </button>
      <button className="docSearch-btn" data-variant="medium" onClick={onOpen}>
       seArch<kbd>{isMac ? "ctrl+k" : "ctrl+k"}</kbd>
      </button>
      <button
        className="docSearch-btn mr-2 hover:bg-accent border border-gray-300"
        data-variant="small"
        onClick={onOpen}
      >
        <IoIosSearch />
      </button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialScrollY={window.scrollY}
            appId={appId}
            apiKey={apiKey}
            indexName={indexName}
            onClose={onClose}
            placeholder="seArch"
			hitComponent={({ hit, children }) => ( <Link href={hit.url}>{children}</Link> )}
          />,
          document.body
        )}
    </>
  );
}
