import React from 'react';
import {FlatList, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {notesnook} from '../../../e2e/test.ids';
import {useTracked} from '../../provider';
import {Actions} from '../../provider/Actions';
import {DrawerScale} from '../../utils/Animations';
import {
  ACCENT,
  COLOR_SCHEME,
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  setColorScheme,
} from '../../utils/Colors';
import {MenuItemsList} from '../../utils/index';
import {MMKV} from '../../utils/mmkv';
import {ColorSection} from './ColorSection';
import {MenuListItem} from './MenuListItem';
import {TagsSection} from './TagsSection';
import {UserSection} from './UserSection';

export const Menu = React.memo(
  () => {
    const [state, dispatch] = useTracked();
    const {colors, deviceMode} = state;
    const insets = useSafeAreaInsets();
    const noTextMode = false;
    function changeColorScheme(colors = COLOR_SCHEME, accent = ACCENT) {
      let newColors = setColorScheme(colors, accent);
      dispatch({type: Actions.THEME, colors: newColors});
    }

    const BottomItemsList = [
      {
        name: colors.night ? 'Day' : 'Night',
        icon: 'theme-light-dark',
        func: () => {
          if (!colors.night) {
            MMKV.setStringAsync('theme', JSON.stringify({night: true}));
            changeColorScheme(COLOR_SCHEME_DARK);
          } else {
            MMKV.setStringAsync('theme', JSON.stringify({night: false}));
            changeColorScheme(COLOR_SCHEME_LIGHT);
          }
        },
        switch: true,
        on: !!colors.night,
        close: false,
      },
      {
        name: 'Settings',
        icon: 'cog-outline',
        close: true,
      },
    ];

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: colors.nav,
        }}>
        <Animated.View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: deviceMode !== 'mobile' ? colors.nav : colors.bg,

            paddingTop: insets.top,
            borderRadius: 10,
            transform: [
              {
                scale: DrawerScale,
              },
            ],
          }}>
          <FlatList
            alwaysBounceVertical={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
            showsVerticalScrollIndicator={false}
            data={[0]}
            keyExtractor={() => 'mainMenuView'}
            renderItem={() => (
              <>
                {MenuItemsList.map((item, index) => (
                  <MenuListItem
                    key={item.name}
                    item={item}
                    testID={item.name}
                    index={index}
                  />
                ))}
                <ColorSection noTextMode={noTextMode} />
                <TagsSection />
              </>
            )}
          />

          {BottomItemsList.slice(1, 2).map((item, index) => (
            <MenuListItem
              testID={
                item.name == 'Night mode'
                  ? notesnook.ids.menu.nightmode
                  : item.name
              }
              key={item.name}
              item={item}
              index={index}
              ignore={true}
              rightBtn={BottomItemsList[0]}
            />
          ))}

          <View
            style={{
              width: '100%',
              paddingHorizontal: 0,
            }}>
            <UserSection noTextMode={noTextMode} />
          </View>
        </Animated.View>
      </View>
    );
  },
  () => true,
);
