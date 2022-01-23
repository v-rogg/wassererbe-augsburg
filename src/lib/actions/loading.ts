import gsap from "gsap";

export default function() {
  const waterSpeed = .1;
  const zones = 625;

  gsap.to('#_w-n', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: .5, ease: 'none' });
  gsap.to('#_bgw-n', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: .5, ease: 'none' });

  gsap.to('#_w-a', { 'stroke-dashoffset': 0, duration: 10 * waterSpeed, delay: .5, ease: 'none' });
  gsap.to('#_bgw-a', { 'stroke-dashoffset': 0, duration: 10 * waterSpeed, delay: .5, ease: 'none' });

  gsap.to('#_w-k', { 'stroke-dashoffset': 0, duration: 10 * waterSpeed, delay: .5, ease: 'none' });
  gsap.to('#_bgw-k', { 'stroke-dashoffset': 0, duration: 10 * waterSpeed, delay: .5, ease: 'none' });

  gsap.to('#_w-m', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: .5, ease: 'none' });
  gsap.to('#_bgw-m', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: .5, ease: 'none' });

  gsap.to('#_w-c', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 1.5, ease: 'none' });
  gsap.to('#_bgw-c', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 1.5, ease: 'none' });

  gsap.to('#_w-b', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 1.5, ease: 'none' });
  gsap.to('#_bgw-b', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 1.5, ease: 'none' });

  gsap.to('#_w-d', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2, ease: 'none' });
  gsap.to('#_bgw-d', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2, ease: 'none' });

  gsap.to('#_w-e', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2, ease: 'none' });
  gsap.to('#_bgw-e', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2, ease: 'none' });

  gsap.to('#_w-f', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });
  gsap.to('#_bgw-f', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });

  gsap.to('#_w-g', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });
  gsap.to('#_bgw-g', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });

  gsap.to('#_w-i', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 3, ease: 'none' });
  gsap.to('#_bgw-i', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 3, ease: 'none' });

  gsap.to('#_w-h', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });
  gsap.to('#_bgw-h', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });

  gsap.to('#_w-l', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });
  gsap.to('#_bgw-l', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 2.5, ease: 'none' });

  gsap.to('#_w-j', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 3, ease: 'none' });
  gsap.to('#_bgw-j', { 'stroke-dashoffset': 0, duration: 5 * waterSpeed, delay: 3, ease: 'none' });

  gsap.to('#_w-o', { 'stroke-dashoffset': 0, duration: 24 * waterSpeed, delay: 1.5, ease: 'none' });
  gsap.to('#_bgw-o', { 'stroke-dashoffset': 0, duration: 24 * waterSpeed, delay: 1.5, ease: 'none' });

  gsap.to('#_w-p', { 'stroke-dashoffset': 0, duration: 15 * waterSpeed, delay: 2.5, ease: 'none' });
  gsap.to('#_bgw-p', { 'stroke-dashoffset': 0, duration: 15 * waterSpeed, delay: 2.5, ease: 'none' });

  gsap.to('#_w-r', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: 2, ease: 'none' });
  gsap.to('#_bgw-r', { 'stroke-dashoffset': 0, duration: 25 * waterSpeed, delay: 2, ease: 'none' });

  gsap.to('#_w-q', { 'stroke-dashoffset': 0, duration: 15 * waterSpeed, delay: 3, ease: 'none' });
  gsap.to('#_bgw-q', { 'stroke-dashoffset': 0, duration: 15 * waterSpeed, delay: 3, ease: 'none' });

  gsap.to('#_w-s', { 'stroke-dashoffset': 0, duration: 4 * waterSpeed, delay: 4.5, ease: 'none' });
  gsap.to('#_bgw-s', { 'stroke-dashoffset': 0, duration: 4 * waterSpeed, delay: 4.5, ease: 'none' });

  gsap.to('#_w-u', { 'stroke-dashoffset': 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: 'none' });
  gsap.to('#_bgw-u', { 'stroke-dashoffset': 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: 'none' });

  gsap.to('#_w-t', { 'stroke-dashoffset': 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: 'none' });
  gsap.to('#_bgw-t', { 'stroke-dashoffset': 0, duration: 1.5 * waterSpeed, delay: 4.8, ease: 'none' });

  for (let i = 0; i < zones; i++) {
    setTimeout(() => {
      const paddedStep = i.toString().padStart(3, "0");
      gsap.to(`[id*='-${paddedStep}']`, {opacity: 1, duration: 1})
    },  i + Math.random() * 10 / zones * 50000 + 3000)
  }
}
