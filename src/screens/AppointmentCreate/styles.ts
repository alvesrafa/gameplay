import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  form: { paddingHorizontal: 24, marginTop: 32 },
  select: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    height: 68,

    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,

    paddingRight: 25,
    overflow: 'hidden',
  },
  fakeImage: {
    width: 64,
    height: 68,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary40,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
  },
  selecBody: { flex: 1, alignItems: 'center' },

  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginRight: 4,
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.highlight,
  },
  charLimit: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
  },
  footer: {
    marginVertical: 20,
    marginBottom: 48,
  },
});
