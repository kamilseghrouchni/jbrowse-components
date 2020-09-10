---
id: developer_code_organization
title: Monorepo code organization
---

JBrowse 2 code is organized as a monorepo using [lerna](https://lerna.js.org/)
and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Using a
monorepo means that instead of separate GitHub repositories for each piece of
JBrowse, they are all in a single place and can share code easily. In the top
level of the repository there are two directories, `packages/` and `products/`
that each contain multiple packages.

Each "package" is an npm-style (i.e. contains `package.json`) package. The
packages in `packages/` are core code, development tools, etc. The packages in
`plugins/` are JBrowse plugins. Most of JBrowse is written as plugins, so that
is where most of the code is. The packages in `products/` are user-facing
products, such as JBrowse Web, JBrowse Desktop, JBrowse CLI, etc.

### Monorepo packages

The following is a summary of some of the individual packages in the monorepo.
It's not a comprehensive list, but will hopefully help familiarize you with how
the code is organized.

#### products/jbrowse-web

This is the full JBrowse Web app. It is built using
[create-react-app](https://create-react-app.dev/).

It includes many other packages as core plugins, can load other plugins at
runtime, and more.

It also currently holds the "integration tests" that we use for our code in
`products/jbrowse-web/src/tests`.

#### products/jbrowse-desktop

JBrowse Desktop is our essentially the same as JBrowse Web, but packaged with
[electron](https://www.electronjs.org/) into a desktop app. This gives it the
ability to easily load and save tracks based on files on your local filesystem.
It also has save sessions locally, and works offline.

#### products/website

This provides the docusaurus website with docs, blog, and pdf documentation

#### plugins/alignments

This package provides the "alignments" related features including

- BamAdapter - our BAM parser that wraps @gmod/bam NPM module
- CramAdapter - our CRAM parser that wraps the @gmod/cram NPM module
- PileupTrack type - draws alignments as boxes in a "pileup" style view
- SNPCoverageTrack - draws calculated coverage with mismatches drawn over the coverage
- AlignmentsTrack - a "supertrack" which contains a PileupTrack and
  SNPCoverageTrack "subtracks"
- AlignmentsFeatureWidget for alignments features

#### plugins/variants/

Provides variant features including

- VCF tabix parser
- VariantFeatureWidget
- VariantTrack that is basically just a normal track, but has logic to popup
  the VariantFeatureWidget on feature click

#### plugins/hic

This provides a HicAdapter based on the .hic file format
([ref](https://github.com/aidenlab/juicer/wiki/Data#hic-files))

Also a track type and renderer to visualize these

#### plugins/bed

Provides two bed related data adapters

- BigBedAdapter
- BedTabixAdapter

These can be used with the SvgFeatureRenderer

#### plugins/wiggle

Provides wiggle track types with different types of rendering formats including

- XYPlotRenderer
- LinePlotRenderer
- DensityRenderer

The WiggleTrack type can swap out these different rendering types, and
calculates stats such as max and min score over a region before the region is
rendered

#### plugins/svg

This is the main gene glyphs, which are rendered using SVG

General usage of this involves referencing the SvgFeatureRenderer

#### plugins/spreadsheet-view

This provides a spreadsheet-in-the-browser that can be used as a data backend
to power other views

#### plugins/circular-view

This provides our 'Circos-style' whole-genome overview of data, especially
genomic translocations

#### plugins/sv-inspector

This is a "superview" type that contains a circular and spreadsheet view as
child views