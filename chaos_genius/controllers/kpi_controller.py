import traceback
from datetime import date, datetime, timedelta

from flask import current_app
import pandas as pd

from chaos_genius.views.kpi_view import get_kpi_data_from_id
from chaos_genius.core.anomaly.controller import AnomalyDetectionController
from chaos_genius.core.rca.rca_controller import RootCauseAnalysisController

RCA_SLACK_DAYS = 5


def _is_data_present_for_end_date(kpi_info: dict, end_date: datetime = None) -> bool:
    rca_controller = RootCauseAnalysisController(kpi_info, end_date)
    _, rca_df = rca_controller._load_data(timeline="dod", tail=100)
    return len(rca_df) != 0


def run_anomaly_for_kpi(kpi_id: int, end_date: datetime = None) -> bool:

    print("Printing the anomaly...")

    try:

        kpi_info = get_kpi_data_from_id(kpi_id)

        # by default we always calculate for n-1
        if end_date is None:
            end_date = datetime.today() - timedelta(days=1)

        # Check if n-1 data is available or not then try for n-2
        if not _is_data_present_for_end_date(kpi_info, end_date):
            end_date = end_date - timedelta(days=1)

        adc = AnomalyDetectionController(kpi_info, end_date)

        adc.detect()

    except Exception as e:
        traceback.print_exc()
        return False

    return True


def _get_end_data_for_rca_kpi(
    kpi_info: dict,
    end_date: datetime = None
) -> datetime:
    # by default we always calculate for n-1
    if end_date is None:
        end_date = datetime.today() - timedelta(days=1)

    count = 0
    while not _is_data_present_for_end_date(kpi_info, end_date) \
            or count > RCA_SLACK_DAYS:
        end_date = end_date - timedelta(days=1)
        count += 1

    return end_date



def run_rca_for_kpi(kpi_id: int, end_date: datetime = None) -> bool:

    try:
        kpi_info = get_kpi_data_from_id(kpi_id)

        end_date = _get_end_data_for_rca_kpi(kpi_info, end_date)

        rca_controller = RootCauseAnalysisController(kpi_info, end_date)
        rca_controller.compute()

    except Exception as e:
        traceback.print_exc()
        return False

    return True
