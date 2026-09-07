"use client";

/**
 * Ensures the TinaCMS edit state hook is mounted at the root of the app.
 * useEditState() sends a postMessage to window.parent asking "am I in
 * edit mode?" — the TinaCMS admin iframe responds with "tina:editMode"
 * which activates live field updates in all useTina() hooks on the page.
 *
 * On normal site visits the parent responds with nothing, so this is a no-op.
 */

import { useEditState } from "tinacms/dist/react";

function EditStateMounter() {
  // Calling useEditState() is enough — it sets up the postMessage listener
  // that activates live editing when the page is inside the TinaCMS admin iframe.
  useEditState();
  return null;
}

export function TinaEditProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditStateMounter />
      {children}
    </>
  );
}
