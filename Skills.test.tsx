import React from "react"
import renderer from "react-test-renderer"

import Skills from "./app/(authenticated)/profile/skills"

describe("<Skills />", () => {
  it("has 3 children", () => {
    const tree: any = renderer.create(<Skills />).toJSON()
    expect(tree?.children?.length).toBe(3)
  })
})