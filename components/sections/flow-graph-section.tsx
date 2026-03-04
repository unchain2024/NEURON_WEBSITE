"use client";

import { MotionDiv, fadeInUp } from "@/components/motion-wrapper";
import FlowGraph from "@/components/flow-graph";

export default function FlowGraphSection() {
  return (
    <div className="section-container">
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <FlowGraph />
      </MotionDiv>
    </div>
  );
}
