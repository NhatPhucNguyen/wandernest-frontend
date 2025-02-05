import { cleanup } from "@testing-library/react";
import { beforeEach } from "node:test";
import { vi } from "vitest";
beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
});
