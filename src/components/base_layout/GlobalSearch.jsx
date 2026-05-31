/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  Divider,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useGlobalSearch } from "../../hooks/modules/useGlobalSearch";

export const GlobalSearch = ({
  autoFocus = false,
  placeholder = "Cari sesuatu ...",
  width = 250,
  onNavigate = () => {},
}) => {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const inputRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { query, setQuery, results, loading, error } = useGlobalSearch();

  const flatResults = useMemo(
    () =>
      (results.groups ?? []).flatMap((group) =>
        (group.results ?? []).map((result) => result),
      ),
    [results.groups],
  );

  const hasQuery = query.trim() !== "";
  const anchorVisible =
    Boolean(anchorRef.current) && anchorRef.current.offsetParent !== null;
  const showPanel = open && hasQuery && anchorVisible;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query, results]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  const closePanel = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(closePanel, 120);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const navigateToResult = (url) => {
    closePanel();
    onNavigate();
    navigate(url);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    setOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closePanel();
      inputRef.current?.blur();
      return;
    }

    if (!showPanel && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
      setOpen(true);
    }

    if (event.key === "ArrowDown" && flatResults.length > 0) {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % flatResults.length);
      return;
    }

    if (event.key === "ArrowUp" && flatResults.length > 0) {
      event.preventDefault();
      setActiveIndex(
        (current) => (current <= 0 ? flatResults.length - 1 : current - 1),
      );
      return;
    }

    if (event.key === "Enter" && flatResults.length > 0) {
      event.preventDefault();
      const result = flatResults[activeIndex] ?? flatResults[0];
      navigateToResult(result.url);
    }
  };

  const renderState = () => {
    if (loading) {
      return (
        <Box display="flex" alignItems="center" gap={1.5} px={2} py={1.5}>
          <CircularProgress size={16} />
          <Typography color="gray-500" fontSize={13} fontWeight={600}>
            Mencari data...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" fontSize={13} fontWeight={600} px={2} py={1.5}>
          {error}
        </Typography>
      );
    }

    if (flatResults.length === 0) {
      return (
        <Typography color="gray-500" fontSize={13} fontWeight={600} px={2} py={1.5}>
          Tidak ada hasil
        </Typography>
      );
    }

    let resultIndex = -1;

    return (
      <List dense disablePadding role="listbox">
        {results.groups.map((group, groupIndex) => (
          <Box key={group.type}>
            {/* {groupIndex > 0 && <Divider />} */}
            <Typography
              color="gray-500"
              fontSize={11}
              fontWeight={700}
              px={1.5}
              py={0.75}
              textTransform="uppercase"
              backgroundColor="gray-50"
            >
              {group.label}
            </Typography>
            {(group.results ?? []).map((result) => {
              resultIndex += 1;
              const currentIndex = resultIndex;
              const selected = activeIndex === currentIndex;

              return (
                <ListItemButton
                  key={`${group.type}-${result.id}`}
                  role="option"
                  selected={selected}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(currentIndex)}
                  onClick={() => navigateToResult(result.url)}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    "&.Mui-selected": {
                      backgroundColor: "gray-100",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "zinc-200",
                    },
                  }}
                >
                  <ListItemText
                    primary={result.title}
                    secondary={result.subtitle}
                    primaryTypographyProps={{
                      color: "gray-800",
                      fontSize: 13,
                      fontWeight: 700,
                      noWrap: true,
                    }}
                    secondaryTypographyProps={{
                      color: "gray-500",
                      fontSize: 12,
                      fontWeight: 600,
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </Box>
        ))}
      </List>
    );
  };

  return (
    <ClickAwayListener onClickAway={closePanel}>
      <Box
        ref={anchorRef}
        onMouseDown={cancelClose}
        sx={{
          width,
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            backgroundColor: "zinc-200",
            width: "100%",
            padding: "0 10px",
            boxSizing: "border-box",
            borderRadius: "3px",
          }}
        >
          <FiSearch color="#637381" />
          <InputBase
            inputRef={inputRef}
            value={query}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setOpen(true)}
            onBlur={scheduleClose}
            onKeyDown={handleKeyDown}
            inputProps={{
              "aria-label": "Cari data",
              "aria-expanded": showPanel,
              role: "combobox",
            }}
            sx={{
              flexGrow: 1,
              minWidth: 0,
              color: "gray-500",
              fontWeight: "bold",
              fontSize: "14px",
              "& .MuiInputBase-input::placeholder": {
                color: "#637381",
                opacity: 1,
                fontWeight: "bold",
              },
            }}
          />
        </Box>
        <Popper
          open={showPanel}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 1,
            mt: 1,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              width: anchorRef.current?.offsetWidth || width,
              maxHeight: 360,
              overflowY: "auto",
              borderRadius: "4px",
              border: "1px solid #DFE3E8",
            }}
          >
            {renderState()}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
