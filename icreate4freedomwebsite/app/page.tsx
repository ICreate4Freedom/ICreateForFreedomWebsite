import VendingMachine from "@/components/vending-machine/VendingMachine";
import { PageFade } from "@/components/PageFade";

export default function Home() {
  return (
    <>
      {/* the scene is decorative to assistive tech; this is the SR/SEO text */}
      <h1 className="sr-only">ICreate4Freedom — Michael&apos;s corner of the internet</h1>
      <p className="sr-only">
        A vending machine rests in a quiet alley, half-reclaimed by plants.
        Pick a can to open a page: About, Projects, Garden, or Writing. The
        same links are in the footer.
      </p>
      <PageFade>
        <VendingMachine />
      </PageFade>
    </>
  );
}
