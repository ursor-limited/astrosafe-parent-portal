# API hookup checklist

## 1. Send the data to db upon saving

components: InsuranceApplicationFormDialog + InsuranceApplicationLeaders + InsuranceApplicationKeyholders.

These three components contain a function called `commitAnswers`, which currently puts the data into local storage.

Most data goes via the instance in `InsuranceApplicationFormDialog`. The two others have a custom one due to their need to submit variable amounts of identities, i.e. leaders or keyholders.

## 2. Identity verification statuses

- remove `leadersWithHardcodedStatuses` and `keyholdersWithHardcodedStatuses` and use actual statuses
- trigger email
  figma: https://www.figma.com/design/uCjOF1qfcPHm2Q3C3Bk02l/FINH-%3C%3E-AnchorWatch-Handover-V2?node-id=14229-30355&t=SaSjCWqiRkIlv1zq-4
  component: InsuranceApplicationIdentityStatus

## 3. QR code flow

figma: https://www.figma.com/design/uCjOF1qfcPHm2Q3C3Bk02l/FINH-%3C%3E-AnchorWatch-Handover-V2?node-id=11515-563742&t=fdxwBRpoU0cZT0uD-4
component: InsuranceApplicationIdentityKYC

Note that if you use a redirect url from the external platform, it will depend on which flow is in progress.

## 3. Documents list:

figma: https://www.figma.com/design/uCjOF1qfcPHm2Q3C3Bk02l/FINH-%3C%3E-AnchorWatch-Handover-V2?node-id=14331-549776&t=fdxwBRpoU0cZT0uD-4
component: InsuranceApplicationUpload > `onClick` currently just causes flow to advance

## 4. Trigger Payment flow

figma: https://www.figma.com/design/uCjOF1qfcPHm2Q3C3Bk02l/FINH-%3C%3E-AnchorWatch-Handover-V2?node-id=11632-529643&t=mnG5Hzl2mUSGIByS-4
component: InsuranceApplicationPayment > `buttonCallback` currently does nothing

## When you have finished testing, remove TestingBar.tsx and its reference in InsuranceApplicationPage.tsx
