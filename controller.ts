import { Buffer } from "node:buffer";
import { Context } from "hono";
import { resize_image } from "./resize_image";
import { html } from "hono/html";

export const get = (c: Context) =>
  c.html(
    html` <!doctype html>
      <html lang="en">
        <body>
          <form method="post" enctype="multipart/form-data" action="/">
            <input type="file" name="image_url" accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </body>
      </html>`
  );

export const post = async (c: Context) => {
  console.log("I log");

  let event = await c.req.parseBody();
  console.log("I also log:", event);

  if (event.image_url.size !== 0) {
    const blob = Buffer.from(await event.image_url.arrayBuffer());
    await resize_image(blob, "123456789");
  }

  return c.text("ok");
};
