import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTracked } from '../../provider';
import { BUTTON_TYPES } from '../../utils';
import { ph, pv, SIZE } from '../../utils/SizeUtils';
import { PressableButton } from '../PressableButton';
import Heading from '../Typography/Heading';

/**
 *
 * @param {import('../PressableButton').buttonTypes} type
 */
export const Button = ({
  height = 40,
  width = null,
  onPress = () => {},
  loading = false,
  title = '',
  icon,
  fontSize = SIZE.sm,
  type = 'transparent',
  iconSize = SIZE.md,
  style = {},
  testID,
  accentColor = 'accent',
  accentText = 'light',
}) => {
  const [state] = useTracked();
  const {colors} = state;
  const textColor =
    colors[
      type === 'accent'
        ? BUTTON_TYPES[type](accentColor, accentText).text
        : BUTTON_TYPES[type].text
    ];

  return (
    <PressableButton
      onPress={onPress}
      disabled={loading}
      testID={testID}
      type={type}
      accentColor={accentColor}
      accentText={accentText}
      customStyle={{
        height: height,
        width: width || null,
        paddingVertical: pv,
        paddingHorizontal: ph,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      }}>
      {loading && <ActivityIndicator color={textColor} />}
      {icon && !loading && (
        <Icon
          name={icon}
          style={{
            marginRight: 0,
          }}
          color={textColor}
          size={iconSize}
        />
      )}
      {!title ? null : (
        <Heading
          color={textColor}
          size={fontSize}
          style={{
            marginLeft: icon || loading ? 5 : 0,
          }}>
          {title}
        </Heading>
      )}
    </PressableButton>
  );
};