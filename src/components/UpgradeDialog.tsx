import { ReactComponent as VerifiedIcon } from './../images/VerifiedIcon.svg'
import { ReactComponent as CheckIcon } from './../images/CheckIcon.svg'
import { Stack, alpha } from '@mui/system'
import { PALETTE, Typography, UrsorButton, UrsorInputField } from './../ui'
import UrsorDialog from './UrsorDialog'
import { useUserContext } from './UserContext'
import useNavigate from '../hooks/useNavigate'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import AstroSwitch from './AstroSwitch'

export const astroCurrency = ['USD', 'GBP', 'CAD', 'EUR'] as const
export type AstroCurrency = (typeof astroCurrency)[number]

export const CURRENCY_SYMBOLS: Record<AstroCurrency, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
  EUR: '€',
}

interface IAstroProduct {
  monthlyId: string
  annualId: string
  plan: 'home' | 'school'
  items: string[]
  title: string
  subtitle: string
  monthlyPrices: {
    [locale in AstroCurrency]: number
  }
  annualPrices: {
    [locale in AstroCurrency]: number
  }
}

export const PRODUCT_DETAILS: IAstroProduct[] = [
  {
    monthlyId: 'prod_PlC9OCbk8oBkWW',
    annualId: 'prod_PlWrHG8V57yjrn',
    plan: 'home',
    items: [
      '10 devices monitored',
      'Unlimited parents/teachers',
      'All features included',
    ],
    title: 'Home',
    subtitle: 'Ideal for families',
    monthlyPrices: {
      USD: 12.99,
      GBP: 8.99,
      CAD: 15.99,
      EUR: 10.99,
    },
    annualPrices: {
      USD: 119.99,
      GBP: 79.99,
      CAD: 149.99,
      EUR: 99.99,
    },
  },
  {
    monthlyId: 'prod_QAEaFpLDEJnlli',
    annualId: 'prod_QAEYttD39HvFKz',
    plan: 'school',
    items: [
      '10 devices monitored',
      'Unlimited parents/teachers',
      'All features included',
    ],
    title: 'school',
    subtitle: 'Ideal for Schools',
    monthlyPrices: {
      USD: 59.99,
      GBP: 39.99,
      CAD: 74.99,
      EUR: 49.99,
    },
    annualPrices: {
      USD: 599.99,
      GBP: 399.99,
      CAD: 749.99,
      EUR: 499.99,
    },
  },
]

export const FrequencySwitch = (props: {
  value: 'monthly' | 'annual'
  callback: () => any
}) => (
  <Stack direction="row" spacing="12px" alignItems="center" height="26px">
    <Typography bold color={PALETTE.secondary.grey[4]}>
      Annual discount
    </Typography>
    <AstroSwitch on={props.value === 'annual'} callback={props.callback} />
  </Stack>
)

export const LOCALE_CURRENCIES: Record<string, AstroCurrency> = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AT: 'EUR',
  BE: 'EUR',
  BG: 'EUR',
  HR: 'EUR',
  CY: 'EUR',
  CZ: 'EUR',
  DK: 'EUR',
  EE: 'EUR',
  FI: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  GR: 'EUR',
  HU: 'EUR',
  IE: 'EUR',
  IT: 'EUR',
  LV: 'EUR',
  LT: 'EUR',
  LU: 'EUR',
  MT: 'EUR',
  NL: 'EUR',
  PL: 'EUR',
  PT: 'EUR',
  RO: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  ES: 'EUR',
  SE: 'EUR',
  AL: 'EUR',
  AD: 'EUR',
  AM: 'EUR',
  BY: 'EUR',
  BA: 'EUR',
  FO: 'EUR',
  GE: 'EUR',
  GI: 'EUR',
  IS: 'EUR',
  IM: 'EUR',
  XK: 'EUR',
  LI: 'EUR',
  MK: 'EUR',
  MD: 'EUR',
  MC: 'EUR',
  ME: 'EUR',
  NO: 'EUR',
  RU: 'EUR',
  SM: 'EUR',
  RS: 'EUR',
  CH: 'EUR',
  TR: 'EUR',
  UA: 'EUR',
  VA: 'EUR',
}

export const getPaymentUrl = (
  email: string,
  plan: 'home' | 'school',
  frequency: 'monthly' | 'annual'
) =>
  `${
    frequency === 'monthly'
      ? plan === 'home'
        ? ''
        : ''
      : plan === 'home'
      ? ''
      : ''
  }?prefilled_email=${encodeURIComponent(email)}`

const PricingCard = (props: {
  title: string
  subtitle: string
  buttonText: string
  price: string
  currency: string
  unit: string
  items?: string[]
  text?: string
  dark?: boolean
  tinyText?: string
  border?: boolean
  notif?: string
  noButtonIcon?: boolean
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  callback: () => any
}) => (
  <Stack
    flex={1}
    bgcolor={
      props.dark ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[1]
    }
    p="28px"
    boxSizing="border-box"
    alignItems="center"
    borderRadius="20px"
    border={
      props.border ? `4px solid ${PALETTE.secondary.purple[3]}` : undefined
    }
    position="relative"
  >
    {props.notif ? (
      <Stack
        borderRadius="10px"
        bgcolor={PALETTE.system.orange}
        height="24px"
        position="absolute"
        top="-16px"
        right="-26px"
        justifyContent="center"
        px="16px"
      >
        <Typography variant="small" bold color={PALETTE.font.light}>
          {props.notif}
        </Typography>
      </Stack>
    ) : null}
    <Stack spacing="2px" alignItems="center">
      <Stack spacing="20px" justifyContent="center" alignItems="center">
        <Stack spacing="4px" alignItems="center">
          <Stack spacing="4px" alignItems="center">
            <Typography
              variant="h4"
              color={
                props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]
              }
            >
              {props.title}
            </Typography>
            <Typography
              color={
                props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]
              }
              variant="small"
              bold
            >
              {props.subtitle}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing="3px">
          <Typography
            variant="small"
            bold
            color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
          >
            {props.currency}
          </Typography>
          <Typography
            variant="h3"
            color={props.dark ? PALETTE.font.light : PALETTE.font.dark}
          >
            {props.price}
          </Typography>
          <Stack
            height="28px"
            bgcolor={PALETTE.secondary.orange[4]}
            borderRadius="10px"
            px="8px"
            justifyContent="center"
          >
            <Typography bold variant="small" color="rgb(255,255,255)">
              Save 30%
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography
        variant="tiny"
        bold
        color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
      >
        {`per ${props.unit}`}
      </Typography>

      <Stack alignItems="center" width="100%" pb="20px">
        <Typography
          variant="tiny"
          bold
          color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
        >
          {props.tinyText}
        </Typography>
      </Stack>
    </Stack>

    <Stack
      justifyContent="flex-end"
      sx={
        props.dark
          ? {
              cursor: 'pointer',
              '&:hover': { opacity: 0.6 },
              transition: '0.2s',
            }
          : undefined
      }
      onClick={props.callback}
    >
      <Stack sx={{ pointerEvents: props.dark ? 'none' : undefined }}>
        <UrsorButton
          dark
          variant={props.dark ? 'primary' : 'tertiary'}
          endIcon={
            props.icon || (props.noButtonIcon ? undefined : VerifiedIcon)
          }
        >
          {props.buttonText}
        </UrsorButton>
      </Stack>
    </Stack>
    {props.items ? (
      <Stack spacing="8px" pt="18px">
        {props.items.map((item, i) => (
          <Stack key={i} direction="row" spacing="6px">
            <Stack
              borderRadius="100%"
              height="18px"
              width="18px"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgb(255,255,255)"
            >
              <CheckIcon width="12px" height="12px" />
            </Stack>
            <Typography
              variant="small"
              color={props.dark ? PALETTE.secondary.grey[1] : undefined}
            >
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    ) : null}
    {props.text ? (
      <Stack pt="22px">
        <Typography
          variant="small"
          color={props.dark ? PALETTE.secondary.grey[1] : undefined}
        >
          Contact sales for custom pricing based on the number of teacher
          accounts and devices you would like in your plan, and we&apos;ll make
          it happen!!!
        </Typography>
      </Stack>
    ) : null}
  </Stack>
)

const UpgradeDialog = (props: {
  open: boolean
  closeCallback: () => any
  mobile?: boolean
}) => {
  const user = useUserContext().user

  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>('upgradedNotificationPending', false)
  const navigate = useNavigate()

  const [locale, setLocale] = useState<string>('US')

  const getIp = async () => {
    // Connect ipapi.co with fetch()
    const response = await fetch('https://ipapi.co/json/').then(
      async (response) => {
        const data = await response.json()
        // Set the IP address to the constant `ip`
        data.country_code && setLocale(data.country_code)
      }
    )
  }

  // Run `getIP` function above just once when the page is rendered
  useEffect(() => {
    getIp()
  }, [])

  const [frequency, setFrequency] = useState<'monthly' | 'annual'>('annual')

  const [licenseKeyInputValue, setLicenseKeyInputValue] = useState<string>('')

  return (
    <UrsorDialog
      title="Upgrade to a paid plan and enjoy unlimited access."
      open={props.open}
      titleSize={props.mobile ? 'h5' : 'h3'}
      noOverflowHidden
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width="1030px"
      maxWidth="1030px"
      titleMaxWidth="600px"
      scrollable
    >
      <Stack width="100%" alignItems="center">
        <FrequencySwitch
          value={frequency}
          callback={() =>
            setFrequency(frequency === 'annual' ? 'monthly' : 'annual')
          }
        />
      </Stack>
      <Stack
        direction={props.mobile ? 'column' : 'row'}
        spacing="32px"
        width="100%"
        pt="20px"
      >
        <PricingCard
          title="Home"
          subtitle="Ideal for families"
          buttonText="Upgrade"
          price={(
            (frequency === 'annual'
              ? PRODUCT_DETAILS[0]?.annualPrices
              : PRODUCT_DETAILS[0]?.monthlyPrices)[LOCALE_CURRENCIES[locale]] ??
            0
          ).toString()}
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={frequency === 'monthly' ? 'month' : 'year'}
          items={PRODUCT_DETAILS[0].items}
          callback={() => {
            navigate.push(
              user?.email ? getPaymentUrl(user.email, 'home', frequency) : ''
            )
            setUpgradedNotificationPending(true)
          }}
        />
        <PricingCard
          dark
          border
          title="School"
          subtitle="Ideal for schools"
          buttonText="Upgrade"
          price={(
            (frequency === 'annual'
              ? PRODUCT_DETAILS[1]?.annualPrices
              : PRODUCT_DETAILS[1]?.monthlyPrices)[LOCALE_CURRENCIES[locale]] ??
            0
          ).toString()}
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={frequency === 'monthly' ? 'month' : 'year'}
          items={PRODUCT_DETAILS[1].items}
          callback={() => {
            navigate.push(
              user?.email ? getPaymentUrl(user.email, 'school', frequency) : ''
            )
            setUpgradedNotificationPending(true)
          }}
        />
        <Stack
          flex={1}
          bgcolor={PALETTE.secondary.grey[1]}
          p="28px"
          boxSizing="border-box"
          alignItems="center"
          borderRadius="20px"
          position="relative"
          spacing="20px"
        >
          <Stack spacing="4px" alignItems="center">
            <Typography color={PALETTE.secondary.grey[4]} variant="h4">
              License key
            </Typography>
            <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
              Add your AstroSafe license key
            </Typography>
          </Stack>
          <Stack alignItems="center" spacing="10px">
            <UrsorInputField
              value={licenseKeyInputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLicenseKeyInputValue(event.target.value)
              }}
              leftAlign
              backgroundColor="rgb(255,255,255)"
              width="100%"
            />
            <Typography color={PALETTE.secondary.grey[4]} bold variant="tiny">
              12 digit code sent to you by the Astro team
            </Typography>
          </Stack>
          <UrsorButton variant="secondary">Unlock</UrsorButton>
        </Stack>
      </Stack>
      <Stack
        height="52px"
        width="100%"
        justifyContent="center"
        bgcolor={PALETTE.secondary.grey[1]}
        alignItems="center"
        mt="24px"
        spacing="20px"
        direction="row"
        borderRadius="20px"
      >
        <Typography bold color={PALETTE.secondary.grey[4]}>
          Need a plan with more devices?
        </Typography>
        <UrsorButton
          variant="secondary"
          size="small"
          onClick={() => (window.location.href = 'mailto:hello@astrosafe.co')}
        >
          Contact sales
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  )
}

export default UpgradeDialog
