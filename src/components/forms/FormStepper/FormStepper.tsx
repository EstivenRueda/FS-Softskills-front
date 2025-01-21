import type { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { parseAsInteger, useQueryState } from 'next-usequerystate';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';
import { scrollToTop } from '@/utils';

const ALL_ENABLED_WILDCARD = '*';

export type FormStep = {
  name: string;
  title: string;
  icon?: ReactElement;
  component?: ReactNode;
};

export type FormStepperProps = {
  steps: FormStep[];
  stepsEnabled: string | string[];
};

export function FormStepper(props: FormStepperProps) {
  const { steps, stepsEnabled } = props;
  const paths = usePathname();
  const { push } = useRouter();
  const [step, setStep] = useQueryState('step', parseAsInteger);
  const [activeStep, setActiveStep] = useState(step ?? 0);
  const totalSteps = () => steps.length;
  const isLastStep = () => activeStep === totalSteps() - 1;

  useEffect(() => {
    step !== null && setActiveStep(step);
  }, [step]);

  const isStepEnabled = (name: string) => {
    if (typeof stepsEnabled === 'string' && stepsEnabled === ALL_ENABLED_WILDCARD) return true;
    if (!name) return false;
    return stepsEnabled.includes(name);
  };

  const isNextStepEnabled = () => {
    const newActiveStep = isLastStep() ? 0 : activeStep + 1;

    return isStepEnabled(steps[newActiveStep]?.name);
  };

  const handleNext = () => {
    const newActiveStepIndex = isLastStep() ? 0 : activeStep + 1;
    setActiveStep(newActiveStepIndex);
    setStep(newActiveStepIndex);
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setStep(activeStep - 1);
    scrollToTop();
  };

  const handleChange = (event: SyntheticEvent, index: number) => {
    setActiveStep(index);
    setStep(index);
  };
  const path = paths.split('/')[1];

  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider', pt: 2, px: 2 }}>
        <Tabs value={activeStep} onChange={handleChange} aria-label="stepper tabs">
          {steps.map((step, index) => (
            <Tab
              key={step.title}
              icon={step.icon}
              label={
                <Typography fontSize={15} mb={2} width={120} align="center">
                  {step.title}
                </Typography>
              }
              disabled={!isStepEnabled(step.name)}
              sx={{ pb: 3 }}
            />
          ))}
        </Tabs>
      </Box>

      <Box py={5} px={3}>
        {steps[activeStep]?.component}
      </Box>

      <Box display="flex" justifyContent="space-between" gap={1} px={3} pb={3}>
        <Box display="flex" gap={3}>
          <Button
            sx={{
              width: 200,
              boxShadow: 0.7,
              fontWeight: 600,
            }}
            color="secondary"
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Atrás
          </Button>
          <Button
            sx={{
              width: 200,
              color: '#2F3DA9',
              boxShadow: 0.7,
              fontWeight: 600,
            }}
            color="secondary"
            variant="outlined"
            name="save_and_add"
            disabled={isLastStep() || !isNextStepEnabled()}
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </Box>
        {isLastStep() && (
          <Button onClick={() => push(`/${path}`)} sx={{ width: 200 }} color="secondary" variant="contained">
            Finalizar
          </Button>
        )}
      </Box>
    </Paper>
  );
}
