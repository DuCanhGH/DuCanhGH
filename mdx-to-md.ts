import { args, flags } from "args-flags";
import { watch } from "chokidar";
import { readFile, writeFile } from "fs/promises";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import type { BundleMDX } from "mdx-bundler/dist/types";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { dirname } from "path";
import { basename, resolve } from "path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const htmlToMarkdown = new NodeHtmlMarkdown();

export async function mdxToMd<
  Frontmatter extends {
    [key: string]: any;
  }
>(
  /** The path to the MDX file. */
  path: string,

  /** Configure internal library options. */
  options?: Pick<
    BundleMDX<Frontmatter>,
    "esbuildOptions" | "grayMatterOptions" | "mdxOptions"
  >
) {
  const contents = await readFile(path, "utf-8");
  const { code } = await bundleMDX({
    source: contents,
    cwd: dirname(path),
    ...options,
  });
  const component = getMDXComponent(code);
  const element = createElement(component);
  const html = renderToString(element);
  const markdown = htmlToMarkdown.translate(html);
  return markdown;
}

const [sourcePath, outPath = basename(sourcePath).slice(0, -1)] = args;
const sourceMDX = resolve((flags.cwd as string) ?? process.cwd(), sourcePath);

async function build() {
  try {
    const contents = await mdxToMd(sourceMDX);
    await writeFile(outPath, contents, { encoding: "utf8", flag: "w" });
    console.log(`📝 Converted ${sourcePath} -> ${outPath}`);
  } catch (err) {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
  }
}

if (flags.watch) {
  build();
  watch([sourceMDX, "src/components"]).on("change", build);
} else {
  build();
}
