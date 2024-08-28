import { ReactElement, ReactNodeArray } from 'react';
import Formats from '../core/Formats';
import TranslationValues, { MarkupTranslationValues, RichTranslationValues } from '../core/TranslationValues';
import MessageKeys from '../core/utils/MessageKeys';
import NamespaceKeys from '../core/utils/NamespaceKeys';
import NestedKeyOf from '../core/utils/NestedKeyOf';
import NestedValueOf from '../core/utils/NestedValueOf';
/**
 * Translates messages from the given namespace by using the ICU syntax.
 * See https://formatjs.io/docs/core-concepts/icu-syntax.
 *
 * If no namespace is provided, all available messages are returned.
 * The namespace can also indicate nesting by using a dot
 * (e.g. `namespace.Component`).
 */
export default function useTranslations<NestedKey extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>> = never>(namespace?: NestedKey): {
    <TargetKey extends MessageKeys<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>, NestedKeyOf<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>>>>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
    rich<TargetKey extends MessageKeys<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>, NestedKeyOf<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>>>>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | ReactElement | ReactNodeArray;
    markup<TargetKey extends MessageKeys<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>, NestedKeyOf<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>>>>(key: TargetKey, values?: MarkupTranslationValues, formats?: Partial<Formats>): string;
    raw<TargetKey extends MessageKeys<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>, NestedKeyOf<NestedValueOf<{
        '!': IntlMessages;
    }, [
        NestedKey
    ] extends [never] ? '!' : `!.${NestedKey}`>>>>(key: TargetKey): any;
};
