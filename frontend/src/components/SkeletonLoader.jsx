import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const SkeletonLoader = () => {
  return (
    <Grid  height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      
      <Grid item xs={12} sm={8} md={5} lg={6} width={"400px"}  height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SkeletonLoader;