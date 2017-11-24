import functions from './functions';
import queries from './queries';

export const addActivityFunc = data => {
  console.log(data);
  const { INSERT_ACTIVITY_MUTATION, values, INSERT_SCHEDULE_MUTATION } = data;
  INSERT_ACTIVITY_MUTATION({
    variables: {
      paper_id: data.values.paper,
    },
  })
    .then(({ data }) => {
      // eslint-disable-next-line array-callback-return
      values.schedules.map(schedule => {
        const newStarTime = functions.getDateTime(
          schedule.date,
          schedule.start,
        );
        const newEndTime = functions.getDateTime(schedule.date, schedule.end);

        INSERT_SCHEDULE_MUTATION({
          variables: {
            activity_id: data.insertActivity.id,
            room_id: schedule.room,
            start: newStarTime,
            end: newEndTime,
          },
          refetchQueries: [
            {
              query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
            },
          ],
        });
      });
    })
    .catch(error => {
      console.log('there was an error sending the query', error);
    });
};

export default addActivityFunc;
