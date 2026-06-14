import contextvars
import logging
import sys

request_id_ctx: contextvars.ContextVar[str] = contextvars.ContextVar("request_id", default="-")


class RequestIdFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_ctx.get()
        return True


def _handler_has_request_id(handler: logging.Handler) -> bool:
    return any(isinstance(f, RequestIdFilter) for f in handler.filters)


def configure_logging(level: str = "INFO") -> None:
    numeric_level = getattr(logging, level.upper(), logging.INFO)
    log_format = "%(asctime)s %(levelname)s [%(request_id)s] %(name)s: %(message)s"
    filt = RequestIdFilter()
    root = logging.getLogger()
    root.setLevel(numeric_level)

    for handler in root.handlers:
        if not _handler_has_request_id(handler):
            handler.addFilter(filt)
        if handler.formatter is None:
            handler.setFormatter(logging.Formatter(log_format))

    if not root.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.addFilter(filt)
        handler.setFormatter(logging.Formatter(log_format))
        root.addHandler(handler)
