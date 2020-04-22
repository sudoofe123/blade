import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getColor } from '../../_helpers/theme';
import isDefined from '../../_helpers/isDefined';
import View from '../View';
import Space from '../Space';
import Text from '../Text';

const styles = {
  container: {
    height({ variant }) {
      if (variant === 'outlined') {
        return '10px';
      } else {
        return '20px';
      }
    },
  },
  text: {
    color({ theme, isFocused, hasError, disabled, variant, value }) {
      if (variant === 'outlined') {
        if ((isFocused && !hasError) || isDefined(value)) {
          return getColor(theme, 'primary.800');
        }
      }
      if (disabled) {
        return getColor(theme, 'shade.940');
      }
      return getColor(theme, 'shade.980');
    },
    fontSize({ theme }) {
      return theme.fonts.size.xsmall;
    },
    lineHeight({ theme }) {
      return theme.fonts.lineHeight.small;
    },
    fontFamily({ theme }) {
      return theme.fonts.family.lato.regular;
    },
  },
  label: {
    padding({ iconLeft, prefix, position, variant, isFocused, value }) {
      if (variant !== 'filled' && (iconLeft || prefix) && !isFocused && !isDefined(value)) {
        return ['0', '0', '0', '25px'];
      } else if (position === 'left') {
        return ['18px', '14px', '18px', '14px'];
      }
      return ['0', '0', '0', '0'];
    },
    top({ isFocused, variant, value }) {
      if (isDefined(value) || isFocused || variant === 'filled') {
        return '-5px';
      }
      return '14px';
    },
  },
};

const FloatView = styled(View)`
  position: absolute;
`;

const StyledText = styled(Text)`
  font-family: ${styles.text.fontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: ${styles.text.fontSize};
  line-height: ${styles.text.lineHeight};
  color: ${styles.text.color};
  top: ${styles.label.top};
  transition: top 100ms linear;
`;

const Label = ({
  children,
  position,
  disabled,
  iconLeft,
  prefix,
  animated,
  isFocused,
  hasError,
  variant,
  value,
}) => {
  return (
    <Space
      padding={styles.label.padding({
        position,
        isFocused,
        iconLeft,
        prefix,
        variant,
        value,
      })}
    >
      {animated ? (
        <FloatView>
          <StyledText
            as="label"
            htmlFor={children}
            size="medium"
            isFocused={isFocused}
            hasError={hasError}
            disabled={disabled}
            variant={variant}
            value={value}
          >
            {children}
          </StyledText>
        </FloatView>
      ) : (
        <StyledText
          as="label"
          size="medium"
          hasError={hasError}
          disabled={disabled}
          variant={variant}
          value={value}
        >
          {children}
        </StyledText>
      )}
    </Space>
  );
};

Label.propTypes = {
  children: PropTypes.string,
  position: PropTypes.oneOf(['top', 'left']).isRequired,
  disabled: PropTypes.bool,
  animated: PropTypes.bool,
  isFocused: PropTypes.bool,
  variant: PropTypes.oneOf(['outlined', 'filled']).isRequired,
  iconLeft: PropTypes.string,
  prefix: PropTypes.string,
  hasError: PropTypes.bool,
  value: PropTypes.string,
};

Label.defaultProps = {
  children: 'Label',
  disabled: false,
  animated: false,
  value: undefined,
};

export default Label;