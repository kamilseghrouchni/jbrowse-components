import colors from './color';
import sgFontSize from './fontSize';
import sgFonts from './fonts';

export default {
  fontFamily: sgFonts.fontFamily,
  allVariants: {
    color: colors.darkGrey.main,
  },
  h1: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h1,
    letterSpacing: '-0.24px',
  },
  h2: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h2,
    letterSpacing: '-0.24px',
  },
  h3: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h3,
    letterSpacing: '-0.06px',
  },
  h4: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h4,
    letterSpacing: '-0.06px',
  },
  h5: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h5,
    letterSpacing: '-0.06px',
  },
  h6: {
    fontWeight: 500,
    fontSize: sgFontSize.typography.h6,
    letterSpacing: '-0.06px',
  },
};
