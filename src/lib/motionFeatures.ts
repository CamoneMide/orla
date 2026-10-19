// Loaded on demand by <LazyMotion> in Providers, so Motion's animation and
// layout engine stays out of every page's initial JS. domMax rather than
// domAnimation: the nav pill's width runs on Motion's `layout` animation.
import { domMax } from "motion/react";

export default domMax;
