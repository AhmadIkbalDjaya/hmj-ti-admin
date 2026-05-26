/* eslint-disable react/prop-types */
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { MdAdd, MdDelete } from "react-icons/md";
import { CardSection } from "../../../components/CardSection";
import SkeletonWrapper from "../../../components/SkeletonWrapper";
import AppInputLabel from "../../../components/input/AppInputLabel";

const getError = (errors, key) => {
  const error = errors?.[key];

  return Array.isArray(error) ? error[0] : error;
};

export default function OrganizationProfileForm({
  form = {},
  handleChangeForm = () => {},
  handleMissionChange = () => {},
  handleAddMission = () => {},
  handleRemoveMission = () => {},
  errors = {},
  loading = false,
}) {
  const missionsError = getError(errors, "missions");

  return (
    <CardSection title="Informasi Profil Organisasi">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppInputLabel label="Tujuan" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={96}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="goal"
              name="goal"
              value={form.goal ?? ""}
              onChange={handleChangeForm}
              placeholder="Masukkan tujuan organisasi"
              fullWidth
              multiline
              rows={4}
              error={!!getError(errors, "goal")}
              helperText={getError(errors, "goal")}
            />
          </SkeletonWrapper>
        </Grid>

        <Grid item xs={12}>
          <AppInputLabel label="Visi" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={80}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="vision"
              name="vision"
              value={form.vision ?? ""}
              onChange={handleChangeForm}
              placeholder="Masukkan visi organisasi"
              fullWidth
              multiline
              rows={3}
              error={!!getError(errors, "vision")}
              helperText={getError(errors, "vision")}
            />
          </SkeletonWrapper>
        </Grid>

        <Grid item xs={12}>
          <AppInputLabel label="Misi" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={48}
            rows={3}
            sx={{ borderRadius: "4px" }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              {(form.missions ?? [""]).map((mission, index) => {
                const missionError = getError(errors, `missions.${index}`);

                return (
                  <Box
                    key={index}
                    display="grid"
                    gridTemplateColumns="minmax(0, 1fr) auto"
                    gap={1}
                    alignItems="flex-start"
                  >
                    <TextField
                      value={mission ?? ""}
                      onChange={(event) =>
                        handleMissionChange(index, event.target.value)
                      }
                      placeholder={`Misi ${index + 1}`}
                      fullWidth
                      multiline
                      minRows={2}
                      error={!!missionError}
                      helperText={missionError}
                    />
                    <IconButton
                      aria-label="hapus misi"
                      color="error"
                      onClick={() => handleRemoveMission(index)}
                      sx={{ width: 36, height: 36 }}
                    >
                      <MdDelete />
                    </IconButton>
                  </Box>
                );
              })}
              <IconButton
                aria-label="tambah misi"
                color="primary"
                onClick={handleAddMission}
                sx={{ width: 36, height: 36 }}
              >
                <MdAdd />
              </IconButton>
              {missionsError && (
                <FormHelperText error>{missionsError}</FormHelperText>
              )}
            </Box>
          </SkeletonWrapper>
        </Grid>
      </Grid>
    </CardSection>
  );
}
